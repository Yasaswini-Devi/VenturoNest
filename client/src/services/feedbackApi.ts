import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for AI processing
});

export interface FeedbackApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PitchFeedback {
  pitchId: string;
  pitchTitle: string;
  feedback: string;
  generatedAt: string;
}

// Generate AI feedback for a pitch
export const generatePitchFeedback = async (
  pitchId: string
): Promise<FeedbackApiResponse<PitchFeedback>> => {
  try {
    const response = await api.post<FeedbackApiResponse<PitchFeedback>>(
      `/pitches/${pitchId}/feedback`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: {} as PitchFeedback,
        message: error.response?.data?.message || 'Failed to generate feedback',
        error: error.response?.data?.error || error.message,
      };
    }
    return {
      success: false,
      data: {} as PitchFeedback,
      message: 'Network error occurred',
      error: 'Unknown error',
    };
  }
};

export default api;