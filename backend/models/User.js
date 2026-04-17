const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  domain: { type: String, required: true },
  internId: { type: String },
  role: { type: String, default: 'intern' },
}, { timestamps: true });

// Auto-generate internId before saving a new user
userSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const count = await mongoose.models.User.countDocuments();
      this.internId = `CRV-2024-${String(count + 1).padStart(3, '0')}`;
    } catch (err) {
      next(err);
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
