import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import fs from 'fs';
import { GetCardByIdDto } from './dto/get-card.dto';

@Injectable()
export class CardsService {
  constructor() {
    this.createImgDirIfNotExists();
  }

  async getCardByStream(getCardDto: GetCardByIdDto) {
    const stream = fs.createReadStream(`./dist/cards/img/${getCardDto.id}.jpg`);
    const stats = await fs.promises.stat(
      `./dist/cards/img/${getCardDto.id}.jpg`,
    );
    return { stream, stats };
  }

  async saveCard(card: any) {
    const id = await new Promise(async (res, rej) => {
      const id = nanoid();
      fs.writeFile(`./dist/cards/img/${id}.jpg`, card.buffer, err => {
        if (err) return rej(err);
        return res(id);
      });
    });

    return id;
  }

  async createImgDirIfNotExists() {
    fs.mkdir(`./dist/cards/img`, err => {
      console.log(err);
    });
  }
}
