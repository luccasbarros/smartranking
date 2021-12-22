import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { PlayersService } from './players/players.service';

@Module({
  imports: [JogadoresModule],
  controllers: [],
  providers: [PlayersService],
})
export class AppModule {}
