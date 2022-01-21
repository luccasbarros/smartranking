import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { UpdatePlayerDTO } from './dtos/update-player-dto';
import { IPlayer } from './interfaces/jogador.interface';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDTO,
  ): Promise<IPlayer> {
    const player = await this.playersService.create(createPlayerDto);
    return player;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() createPlayerDto: UpdatePlayerDTO,
    @Param('_id') id: string,
  ): Promise<void> {
    await this.playersService.update(createPlayerDto, id);
  }

  @Get()
  async listPlayers(): Promise<IPlayer[] | IPlayer> {
    return this.playersService.listAllPlayers();
  }

  @Get('/:_id')
  async listPlayerById(@Param('_id') id: string): Promise<IPlayer> {
    const player = await this.playersService.listPlayerById(id);
    return player;
  }

  @Delete('/:_id')
  async deletePlayer(
    @Param('_id', PlayersValidationParamsPipe) id: string,
  ): Promise<void> {
    await this.playersService.deletePlayer(id);
  }
}
