import { Module } from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { JogadoresController } from './jogadores.controller';

@Module({
  controllers: [JogadoresController],
  providers: [PlayersService],
})
export class JogadoresModule {}
