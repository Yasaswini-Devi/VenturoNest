const mongoose = require('mongoose');
const connectionSchema = new mongoose.Schema({
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoPitch: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoPitch', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});
module.exports = mongoose.model('Connection', connectionSchema);