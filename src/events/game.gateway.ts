import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway(80, { namespace: 'game' })
export class GameGateway {
  @SubscribeMessage('start')
  onStart(): WsResponse<string> {
    return { event: 'start', data: null };
  }

  @SubscribeMessage('end')
  onEnd(@MessageBody() winner: string): WsResponse<string> {
    return { event: 'end', data: winner };
  }

  @SubscribeMessage('pause')
  onPause(@MessageBody() player: string): WsResponse<string> {
    return { event: 'pause', data: player };
  }

  @SubscribeMessage('resume')
  onResume(@MessageBody() player: string): WsResponse<string> {
    return { event: 'resume', data: player };
  }

  @SubscribeMessage('reset')
  onReset(): WsResponse<string> {
    return { event: 'reset', data: null };
  }
}
