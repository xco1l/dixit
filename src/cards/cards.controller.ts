import { GetCardByIdDto } from './dto/get-card.dto';
import {
  Controller,
  Post,
  UploadedFile,
  Query,
  ValidationPipe,
  Get,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadCard(@UploadedFile() file: any) {
    const id = await this.cardService.saveCard(file);
    return id;
  }

  @Get('/')
  async getCardById(
    @Query(new ValidationPipe()) getCardDto: GetCardByIdDto,
    @Res() res: Response,
  ) {
    const { stream, stats } = await this.cardService.getCardByStream(
      getCardDto,
    );

    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': stats.size,
    });

    stream.pipe(res);
  }
}
