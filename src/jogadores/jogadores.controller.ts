import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from 'src/players/players.service';
import { IPlayer } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDTO) {
    await this.playersService.createUpdatePlayer(createPlayerDto);
  }

  @Get()
  async listPlayers(): Promise<IPlayer[]> {
    return this.playersService.listAllPlayers();
  }
}
