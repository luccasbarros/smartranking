import { Document } from 'mongoose';
import { IPlayer } from 'src/jogadores/interfaces/jogador.interface';

export interface IEvent {
  name: string;
  operation: string;
  value: number;
}

export interface Category extends Document {
  readonly category: string;
  description: string;
  events: IEvent[];
  players: IPlayer[];
}
