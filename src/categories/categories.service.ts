import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Category } from './interfaces/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const { category } = createCategoryDTO;

    const categoryExist = await this.categoryModel.findOne({ category }).exec();

    if (categoryExist) {
      throw new BadRequestException(`Category has already registered`);
    }

    const categoryCreate = new this.categoryModel(createCategoryDTO);

    return await categoryCreate.save();
  }
}
