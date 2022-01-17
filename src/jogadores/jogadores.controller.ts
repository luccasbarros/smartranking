import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/jogador.interface';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
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
  async deletePlayer(
    @Query('email', PlayersValidationParamsPipe) email: string,
  ): Promise<void> {
    await this.playersService.deletePlayer(email);
  }
}
