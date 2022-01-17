import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
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
  async listPlayers(
    @Query('email') email: string,
  ): Promise<IPlayer[] | IPlayer> {
    if (email) {
      const player = await this.playersService.listPlayerByEmail(email);
      return player;
    } else {
      return this.playersService.listAllPlayers();
    }
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    await this.playersService.deletePlayer(email);
  }
}
