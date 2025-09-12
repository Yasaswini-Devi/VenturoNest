const mongoose = require('mongoose');
const videoPitchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  industry: { type: String, required: true },
  fundingNeeds: { type: Number, required: true }, // Renamed from investmentRequired
  currency: { type: String, required: true, default: 'USD' },
  entrepreneurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  isPublished: { type: Boolean, default: false },
  isDraft: { type: Boolean, default: true },
  // AI Feedback fields
  aiFeedback: { type: String },
  feedbackGeneratedAt: { type: Date }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Virtual fields to get counts for frontend
videoPitchSchema.virtual('likesCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

videoPitchSchema.virtual('savesCount').get(function() {
  return this.saves ? this.saves.length : 0;
});

videoPitchSchema.virtual('commentsCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

// Ensure virtual fields are serialized
videoPitchSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('VideoPitch', videoPitchSchema);