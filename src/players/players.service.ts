import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDTO } from 'src/jogadores/dtos/create-player.dto';
import { IPlayer } from 'src/jogadores/interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: IPlayer[] = [];

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    const playerExist = this.players.find(
      (player: IPlayer) => player.email === email,
    );

    if (playerExist) {
      return this.update(playerExist, createPlayerDTO);
    } else {
      this.create(createPlayerDTO);
    }
  }

  async listAllPlayers(): Promise<IPlayer[]> {
    return this.players;
  }

  async listPlayerByEmail(email: string): Promise<IPlayer> {
    const player = this.players.find((player) => player.email === email);

    if (!player) {
      throw new NotFoundException(`Player not found`);
    }

    return player;
  }

  async deletePlayer(email: string): Promise<void> {
    const findPlayer = this.players.find(
      (player: IPlayer) => player.email === email,
    );

    if (!findPlayer) {
      throw new NotFoundException('Player not found');
    }

    this.players = this.players.filter(
      (player: IPlayer) => player.email !== findPlayer.email,
    );
  }

  private create(createPlayerDTO: CreatePlayerDTO): void {
    const { name, email, phoneNumber } = createPlayerDTO;

    const player: IPlayer = {
      _id: uuidv4(),
      name,
      email,
      phoneNumber,
      ranking: 'A',
      position: 1,
      urlPlayerPhoto: 'www.google.com/foto123.jpg',
    };

    this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`);

    this.players.push(player);
  }

  private update(player: IPlayer, createPlayerDTO: CreatePlayerDTO): void {
    const { name } = createPlayerDTO;

    player.name = name;
  }
}
