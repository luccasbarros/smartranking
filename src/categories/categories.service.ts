import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPlayer } from 'src/jogadores/interfaces/jogador.interface';
import { PlayersService } from 'src/jogadores/players.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';
import { Category } from './interfaces/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
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
    return await this.categoryModel.find().populate('players').exec();
  }

  async listByCategory(category: string): Promise<Category> {
    const categoryExist = await this.categoryModel.findOne({ category }).exec();

    if (!categoryExist) {
      throw new NotFoundException('Category does not exist');
    }

    return categoryExist;
  }

  async getCategoryByChallengerId(_id: string): Promise<Category> {
    const players = await this.playersService.listPlayerById(_id);

    const category = await this.categoryModel
      .findOne()
      .where('players')
      .in(players._id)
      .exec();

    return category;
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

  async insertCategoryOnPlayer(params: string[]): Promise<void> {
    const category = params['category'];

    const playerId = params['playerId'];

    const categoryExist = await this.categoryModel.findOne({ category }).exec();

    const playerInCategory = await this.categoryModel
      .find({ category })
      .where('players')
      .in(playerId)
      .exec();

    await this.playersService.listPlayerById(playerId);

    if (!categoryExist) {
      throw new NotFoundException('Category does not exist');
    }

    if (playerInCategory.length) {
      throw new BadRequestException(
        `Player is already registered in category ${category}`,
      );
    }

    categoryExist.players.push(playerId);

    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: categoryExist })
      .exec();
  }
}
