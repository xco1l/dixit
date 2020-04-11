import { GENDER } from '../enums/gender.enum';
import { RANK } from '../enums/rank.enum';
import { ROLE } from '../enums/role.enum';
import { IUser } from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements Partial<IUser> {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly gender: GENDER;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
