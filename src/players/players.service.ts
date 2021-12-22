import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from 'src/jogadores/dtos/create-player.dto';
import { IPlayer } from 'src/jogadores/interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: IPlayer[] = [];

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
