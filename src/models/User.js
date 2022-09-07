import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
  name: String,
  lastname: String,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    ref: 'Role',
    type: [Schema.Types.ObjectId],
  },
});

userSchema.statics.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  const match = await bcrypt.compare(receivedPassword, password);
  return match;
};

export default model('User', userSchema);
