const mongoose = require('mongoose');
const videoPitchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  investmentRequired: { type: Number, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
module.exports = mongoose.model('VideoPitch', videoPitchSchema);