import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { IEvent } from '../interfaces/categories.interface';

export class UpdateCategoryDTO {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: IEvent[];
}
