import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserTokenModel } from './interfaces/user-token.interface';
import { Model } from 'mongoose';
import { CreateUserTokenDto } from './dto/create-user-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<IUserTokenModel>,
  ) {}

  async create(createUserTokenDto: CreateUserTokenDto) {
    const token = new this.tokenModel(createUserTokenDto);
    return token.save();
  }

  async deleteOneByUID(uId: string, token: string) {
    return this.tokenModel.deleteOne({ uId, token });
  }

  async deleteAllByUID(uId: string) {
    return this.tokenModel.deleteMany({ uId });
  }

  async isExists(uId: string, token: string) {
    return this.tokenModel.exists({ uId, token });
  }
}
