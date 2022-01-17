import { Document } from 'mongoose';

export interface IPlayer extends Document {
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  ranking: string;
  position: number;
  urlPlayerPhoto: string;
}
