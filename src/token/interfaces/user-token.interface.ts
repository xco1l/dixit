import { Document, Types } from 'mongoose';

export interface IUserToken {
  readonly expireAt: string;
  readonly uId: Types.ObjectId;
  readonly token: string;
}

export type IUserTokenModel = IUserToken & Document;
