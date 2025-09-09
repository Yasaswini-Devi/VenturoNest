const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['entrepreneur', 'investor'], required: true },
  companyName: { type: String },
  investmentFocus: { type: String },
});
module.exports = mongoose.model('User', userSchema);