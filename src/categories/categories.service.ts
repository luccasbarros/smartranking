import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';
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

  async list(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async listByCategory(category: string): Promise<Category> {
    const categoryExist = await this.categoryModel.findOne({ category }).exec();

    if (!categoryExist) {
      throw new NotFoundException('Category does not exist');
    }

    return categoryExist;
  }

  async update(
    category: string,
    updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<void> {
    const categoryExist = await this.categoryModel.findOne({ category }).exec();

    if (!categoryExist) {
      throw new NotFoundException('Category does not exist');
    }

    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: updateCategoryDTO })
      .exec();
  }
}
