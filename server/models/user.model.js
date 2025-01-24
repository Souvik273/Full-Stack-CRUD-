const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
  },
  { versionKey: false, timestamps: true, toJSON: { virtuals: true } },
);

userSchema.virtual('notes', {
  ref: 'Note', // Match the model name used in mongoose.model
  localField: '_id',
  foreignField: 'userId',
});

module.exports = mongoose.model('User', userSchema);
