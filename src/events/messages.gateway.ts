import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';

@WebSocketGateway(80, { namespace: 'messages' })
export class UsersGateway {
  @SubscribeMessage('new')
  onNewUser(@MessageBody() message: string): WsResponse<string> {
    return { event: 'new', data: message };
  }
}
