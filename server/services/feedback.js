const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate AI feedback for a pitch based on transcript
 * @param {string} transcript - The transcript of the pitch
 * @param {Object} pitchData - Additional pitch data (title, industry, funding needs, etc.)
 * @returns {Promise<string>} - AI-generated feedback
 */
async function getPitchFeedback(transcript, pitchData = {}) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
You are an experienced startup investor and business advisor. 
Here is information about an entrepreneur's elevator pitch:

Title: ${pitchData.title || 'N/A'}
Industry: ${pitchData.industry || 'N/A'}
Funding Needs: ${pitchData.fundingNeeds ? `$${pitchData.fundingNeeds?.toLocaleString()}` : 'N/A'}
Description: ${pitchData.description || 'N/A'}

Pitch Transcript:
${transcript || 'No transcript available - analyzing based on pitch information provided.'}

Please provide detailed feedback formatted as follows:

## Strengths
• [List 3-4 key strengths of the pitch]

## Areas for Improvement  
• [List 3-4 specific areas that need work]

## Suggestions
• [Provide 3-4 actionable suggestions to improve the pitch]

## Overall Recommendation
[Choose one: STRONG INVEST | CONSIDER | NEEDS SIGNIFICANT WORK]

Keep your response concise but insightful. Focus on practical advice that entrepreneurs can implement.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating pitch feedback:', error);
    throw new Error(`Failed to generate feedback: ${error.message}`);
  }
}

/**
 * Generate AI feedback for a pitch without transcript (based on pitch data only)
 * @param {Object} pitchData - Pitch data (title, industry, funding needs, description)
 * @returns {Promise<string>} - AI-generated feedback
 */
async function getPitchFeedbackFromData(pitchData) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
You are an experienced startup investor and business advisor reviewing a pitch submission.

Pitch Information:
• Title: ${pitchData.title || 'N/A'}
• Industry: ${pitchData.industry || 'N/A'}
• Funding Needs: ${pitchData.fundingNeeds ? `$${pitchData.fundingNeeds?.toLocaleString()}` : 'N/A'}
• Description: ${pitchData.description || 'N/A'}

Based on this information, provide feedback on:

## Initial Assessment
• [Your first impressions of the business concept]

## Market Opportunity
• [Analysis of the industry and market potential]

## Questions to Address
• [Key questions the entrepreneur should answer in their pitch]

## Recommendations
• [Specific advice to strengthen their pitch and business model]

## Next Steps
• [What the entrepreneur should focus on before seeking investment]

## Preliminary Interest Level
[Choose one: HIGH INTEREST | MODERATE INTEREST | LOW INTEREST]

Note: This assessment is based on limited information. A complete evaluation would require seeing the pitch video and additional business details.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating pitch feedback from data:', error);
    throw new Error(`Failed to generate feedback: ${error.message}`);
  }
}

module.exports = {
  getPitchFeedback,
  getPitchFeedbackFromData
};