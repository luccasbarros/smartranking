import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDTO } from 'src/jogadores/dtos/create-player.dto';
import { IPlayer } from 'src/jogadores/interfaces/jogador.interface';
import { UpdatePlayerDTO } from './dtos/update-player-dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>,
  ) {}

  async listAllPlayers(): Promise<IPlayer[]> {
    return await this.playerModel.find().exec();
  }

  async listPlayerById(_id: string): Promise<IPlayer> {
    const player = await this.playerModel.findOne({ _id }).exec();

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }

  async deletePlayer(_id: string): Promise<void> {
    const playerExists = await this.playerModel.findOne({ _id });

    if (!playerExists) {
      throw new BadRequestException('Player has not found');
    }

    await this.playerModel.deleteOne({ _id }).exec();
  }

  public async create(createPlayerDTO: CreatePlayerDTO): Promise<IPlayer> {
    const { email } = createPlayerDTO;

    const playerExists = await this.playerModel.findOne({ email });

    if (playerExists) {
      throw new BadRequestException('Player already exists');
    }

    const player = new this.playerModel(createPlayerDTO);

    return await player.save();
  }

  public async update(
    updatePlayer: UpdatePlayerDTO,
    _id: string,
  ): Promise<void> {
    const playerExist = await this.playerModel.findOne({ _id }).exec();

    if (!playerExist) {
      throw new NotFoundException('Player has not found');
    }

    await this.playerModel
      .findOneAndUpdate({ _id }, { $set: updatePlayer })
      .exec();
  }
}
