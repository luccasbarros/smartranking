import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from 'src/categories/categories.module';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { ChallengesSchema } from './interfaces/challenges.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Challenges',
        schema: ChallengesSchema,
      },
    ]),
    JogadoresModule,
    CategoriesModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
