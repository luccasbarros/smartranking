import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { IPlayer } from 'src/jogadores/interfaces/jogador.interface';
import { PlayersService } from 'src/jogadores/players.service';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';
import { ChallengeStatus } from './enum/challenge-status.enum';
import { Challenge } from './interfaces/challenges.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenges')
    private readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(
    @Body() createChallengeDTO: CreateChallengeDTO,
  ): Promise<Challenge> {
    const players: IPlayer[] = await this.playersService.listAllPlayers();

    // verify if player exist
    createChallengeDTO.players.map((playerDTO: IPlayer) => {
      const filterPlayer = players.filter(
        (player: IPlayer) => player.id === playerDTO._id,
      );

      if (!filterPlayer.length) {
        throw new BadRequestException(`Player ${playerDTO._id} does not exist`);
      }
    });

    // verify if the challenger is on game request

    const challengerIsOnGame = createChallengeDTO.players.filter(
      (player) => player._id === createChallengeDTO.challenger,
    );

    if (!challengerIsOnGame.length) {
      throw new BadRequestException('Challenger might be on the game!');
    }

    // find out player category

    const playerCategory =
      await this.categoriesService.getCategoryByChallengerId(
        createChallengeDTO.challenger,
      );

    if (!playerCategory) {
      throw new NotFoundException(
        'The challenger might be registered in category',
      );
    }

    console.log('alteração recente');

    // create challenge

    const createChallenge = new this.challengeModel(createChallengeDTO);
    createChallenge.category = playerCategory.category;
    createChallenge.challenge_date = new Date();
    createChallenge.status = ChallengeStatus.PENDING;

    return await createChallenge.save();
  }

  async listByChallengerId(challengerId: string): Promise<Challenge[]> {
    const player = await this.playersService.listPlayerById(challengerId);

    return await this.challengeModel
      .find()
      .where('players')
      .in(player._id)
      .exec();
  }
}
