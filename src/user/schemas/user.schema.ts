import mongoose from 'mongoose';
import { GENDER } from '../enums/gender.enum';
import { RANK } from '../enums/rank.enum';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  avatar: { type: String, default: null },
  avatarId: { type: String, default: null },
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: Object.values(GENDER) },
  rank: { type: String, enum: Object.values(RANK), default: RANK.noob },
  games: { type: Number, default: 0 },
});

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ name: 1 });
