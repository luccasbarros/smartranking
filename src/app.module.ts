import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { PlayersService } from './players/players.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(
      'mongodb+srv://mydb123:M1dogcp9@cluster0.mdw2d.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
  ],
  controllers: [],
  providers: [PlayersService],
})
export class AppModule {}
