import { IsNotEmpty } from 'class-validator';

export class UpdatePlayerDTO {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly phoneNumber: string;
}
