import { Document } from 'mongoose';
import { IPlayer } from 'src/jogadores/interfaces/jogador.interface';

export interface Result {
  set: string;
}

export interface Game extends Document {
  category: string;
  players: IPlayer[];
  def: IPlayer;
  result: Result[];
}

export interface Challenge extends Document {
  challenge_date: Date;
  status: string;
  request_date: Date;
  category: string;
  response_date: Date;
  challenger: IPlayer;
  players: IPlayer[];
  game: Game;
}
