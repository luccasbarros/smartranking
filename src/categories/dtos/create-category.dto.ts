import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IEvent } from '../interfaces/categories.interface';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: IEvent[];
}
