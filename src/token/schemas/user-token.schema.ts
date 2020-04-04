import { Schema, Types, SchemaTypeOpts } from 'mongoose';
import { IUserToken } from '../interfaces/user-token.interface';

export const TokenSchema = new Schema({
  token: { type: String, required: true },
  uId: { type: Types.ObjectId, required: true, ref: 'User' },
  expireAt: { type: Date, required: true },
} as { [key in keyof IUserToken]: SchemaTypeOpts<any> });

TokenSchema.index({ token: 1, uId: 1 }, { unique: true });
