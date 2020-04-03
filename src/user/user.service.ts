import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ROLE } from './enums/role.enum';
import bcrypt from 'bcrypt';
import _ from 'lodash';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
    console.log(this.userModel);
  }

  async create(createUserDto: CreateUserDto, roles: ROLE[]) {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const user = new this.userModel(
      _.assignIn(createUserDto, { password: hash, roles }),
    );

    return user.save();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
