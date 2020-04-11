import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WsResponse,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(80, { namespace: 'messages' })
export class UsersGateway implements OnGatewayConnection {
  handleConnection(client: Socket) {
    return true;
  }
}
