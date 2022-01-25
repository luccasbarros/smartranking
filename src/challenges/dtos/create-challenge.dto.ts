import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { IPlayer } from 'src/jogadores/interfaces/jogador.interface';

export class CreateChallengeDTO {
  @IsDateString()
  @IsNotEmpty()
  challenge_date: Date;

  @IsNotEmpty()
  challenger: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: IPlayer[];
}
