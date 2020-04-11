import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import { IUser } from 'src/user/interfaces/user.interface';

@WebSocketGateway(80, { namespace: 'users' })
export class UsersGateway {
  users: Map<string, []> = new Map();

  @SubscribeMessage('new')
  onNewUser(
    @MessageBody() user: Pick<IUser, 'avatar' | 'name' | 'rank' | '_id'>,
  ): WsResponse<typeof user> {
    return { event: 'new', data: user };
  }

  @SubscribeMessage('leave')
  onUserLeave(
    @MessageBody() user: Pick<IUser, 'avatar' | 'name' | 'rank' | '_id'>,
  ): WsResponse<typeof user> {
    return { event: 'leave', data: user };
  }
}

export interface IPlayerData {
  user: Pick<IUser, 'avatar' | 'name' | 'rank' | '_id'>;
  hand: any[];
}
