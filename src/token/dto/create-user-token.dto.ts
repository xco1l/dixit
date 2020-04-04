import { IsString, IsDateString } from 'class-validator';
import { Types } from 'mongoose';
import { IUserToken } from '../interfaces/user-token.interface';

export class CreateUserTokenDto implements IUserToken {
  @IsString()
  token: string;

  @IsString()
  uId: Types.ObjectId;

  @IsDateString()
  expireAt: string;
}
