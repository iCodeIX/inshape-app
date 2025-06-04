import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  googleId: String,
  authType: { type: String, enum: ['google', 'local', 'facebook'], required: true },
  password: { type: String },
});

const User = mongoose.model('User', userSchema);
export default User;