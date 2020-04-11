import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCardByIdDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
