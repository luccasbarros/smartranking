import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersService } from 'src/players/players.service';
import { JogadorSchema } from './interfaces/jogador.schema';
import { JogadoresController } from './jogadores.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: JogadorSchema }]),
  ],
  controllers: [JogadoresController],
  providers: [PlayersService],
})
export class JogadoresModule {}
