import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './interfaces/jogador.schema';
import { JogadoresController } from './jogadores.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: JogadorSchema }]),
  ],
  controllers: [JogadoresController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class JogadoresModule {}
