import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';
import { Category } from './interfaces/categories.interface';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategoryDTO);
  }

  @Get()
  async list(): Promise<Category[]> {
    return await this.categoriesService.list();
  }

  @Get('/:category')
  async listCategoryById(
    @Param('category') category: string,
  ): Promise<Category> {
    return await this.categoriesService.listByCategory(category);
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @Param('category') category: string,
  ): Promise<void> {
    await this.categoriesService.update(category, updateCategoryDTO);
  }

  @Post('/:category/players/:playerId')
  async insertCategoryOnPlayer(@Param() params: string[]): Promise<void> {
    return await this.categoriesService.insertCategoryOnPlayer(params);
  }

  @Get('/player/:playerId')
  async findPlayerCategory(@Param('playerId') playerId: string): Promise<any> {
    return await this.categoriesService.getCategoryByChallengerId(playerId);
  }
}
