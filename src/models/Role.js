import { Schema, model } from 'mongoose';
export const ROLES = ['admin', 'user'];

const roleSchema = new Schema({
  name: String,
});

export default model('Role', roleSchema);
