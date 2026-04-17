const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
