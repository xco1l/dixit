import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { UsersGateway } from './users.gateway';

@Module({
  providers: [GameGateway, UsersGateway],
})
export class EventsModule {}
