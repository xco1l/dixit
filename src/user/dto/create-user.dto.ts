import { GENDER } from '../enums/gender.enum';
import { RANK } from '../enums/rank.enum';
import { ROLE } from '../enums/role.enum';

export class CreateUserDto {
  readonly email: string;
  readonly avatar?: string;
  readonly avatarId?: string;
  readonly name: string;
  readonly gender: GENDER;
  readonly rank: RANK;
  readonly games: number;
  readonly roles: ROLE[];
  readonly password: string;
}
