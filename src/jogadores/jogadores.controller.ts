import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from 'src/players/players.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDTO) {
    await this.playersService.createUpdatePlayer(createPlayerDto);
  }
}
