import mongoose, { SchemaTypeOpts } from 'mongoose';
import { GENDER } from '../enums/gender.enum';
import { RANK } from '../enums/rank.enum';
import { ROLE } from '../enums/role.enum';
import { IUser } from '../interfaces/user.interface';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  avatar: { type: String, default: null },
  avatarId: { type: String, default: null },
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: Object.values(GENDER) },
  rank: { type: String, enum: Object.values(RANK), default: RANK.noob },
  games: { type: Number, default: 0 },
  roles: { type: [String], enum: Object.values(ROLE) },
  password: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
} as { [key in keyof IUser]: SchemaTypeOpts<any> });

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ name: 1 });
