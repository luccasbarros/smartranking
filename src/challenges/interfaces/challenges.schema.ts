import * as mongoose from 'mongoose';

export const ChallengesSchema = new mongoose.Schema(
  {
    challenge_date: { type: Date },
    status: { type: String },
    request_date: { type: Date },
    response_date: { type: Date },
    challenger: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: String },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
    },
  },
  { timestamps: true, collection: 'challenges' },
);
