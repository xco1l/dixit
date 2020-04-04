import { IUser } from './../user/interfaces/user.interface';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { SignInDto } from './dto/signIn.dto';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { SignOptions } from 'jsonwebtoken';
import { IUserModel } from 'src/user/interfaces/user.interface';
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ROLE } from 'src/user/enums/role.enum';
import { ConfigService } from '@nestjs/config';
import addSeconds from 'date-fns/addSeconds';
import { MailService } from 'src/mail/mail.service';
import { compare } from 'bcrypt';
import { addDays } from 'date-fns';

@Injectable()
export class AuthService {
  private clientAppURL: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {
    this.clientAppURL = this.configService.get<string>('FE_APP_URL');
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto, [ROLE.user]);
    await this.sendConfirmation(user);
    return user;
  }

  async signIn({email, password}: SignInDto) {
    const user = await this.userService.findByEmail(email)
    if (!user) throw new BadRequestException('Invalid email or password')

    const isPasswordCorrect = await compare(password, user.password)
    if (!isPasswordCorrect) throw new BadRequestException('Invalid email or password ')

    const tokenPayload: ITokenPayload = {
      _id: user._id,
      confirmed: user.confirmed,
      roles: user.roles
    }

    const token = await this.generateToken(tokenPayload)
    const expireAt = addDays(new Date(), 1).toISOString()

    await this.saveToken({
      token,
      expireAt,
      uId: user._id
    })

    const userWithToken = user.toObject() as IUser
    userWithToken.accessToken = token

    return userWithToken
  }

  async confirm(token: string) {
    try {
      const tokenData = await this.verifyToken(token);
      const user = await this.userService.findById(tokenData._id);

      await this.tokenService.deleteOneByUID(user._id, token);

      if (user && !user.confirmed) {
        user.confirmed = true;
        return user.save();
      }

      throw new BadRequestException('Confirmation error');
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async sendConfirmation(user: IUserModel) {
    const expiresIn = 60 * 60 * 24;
    const tokenPayload = {
      _id: user._id,
      confirmed: user.confirmed,
      roles: user.roles,
    };
    const expireAt = addSeconds(new Date(), expiresIn).toISOString();

    const token = await this.generateToken(tokenPayload, { expiresIn });
    const confirmLink = `${this.clientAppURL}/auth/confirm?token=${token}`;

    await this.saveToken({ token, uId: user._id, expireAt });
    await this.mailService.send({
      from: this.configService.get<string>('MAIL_USER'),
      to: user.email,
      subject: `Verify your accout.`,
      html: `
      <h3> Hello ${user.name}!</h3>
      <To confirm your account click on the link below.
      <a href=${confirmLink}>Click here</a>
      `,
    });
  }

  private async generateToken(data: ITokenPayload, options?: SignOptions) {
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token: string) {
    try {
      const user: IUserModel = this.jwtService.verify(token);
      const isExist = await this.tokenService.isExists(user._id, token);

      if (isExist) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    return this.tokenService.create(createUserTokenDto);
  }
}
