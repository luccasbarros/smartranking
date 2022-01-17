import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDTO } from 'src/jogadores/dtos/create-player.dto';
import { IPlayer } from 'src/jogadores/interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>,
  ) {}

  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    const playerExists = await this.playerModel.findOne({ email }).exec();

    if (playerExists) {
      await this.update(createPlayerDTO);
    } else {
      await this.create(createPlayerDTO);
    }
  }

  async listAllPlayers(): Promise<IPlayer[]> {
    return await this.playerModel.find().exec();
  }

  async listPlayerByEmail(email: string): Promise<IPlayer> {
    const player = await this.playerModel.findOne({ email }).exec();

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }

  async deletePlayer(email: string): Promise<void> {
    await this.playerModel.deleteOne({ email }).exec();
  }

  private async create(createPlayerDTO: CreatePlayerDTO): Promise<IPlayer> {
    const player = new this.playerModel(createPlayerDTO);

    return await player.save();
  }

  private async update(createPlayerDTO: CreatePlayerDTO): Promise<IPlayer> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDTO.email },
        { $set: createPlayerDTO },
      )
      .exec();
  }
}
