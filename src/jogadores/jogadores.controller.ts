import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  @Post()
  async criarAtualizarJogador(@Body() createPlayerDto: CreatePlayerDTO) {
    const { email } = createPlayerDto;
    return JSON.stringify({
      name: email,
    });
  }
}
