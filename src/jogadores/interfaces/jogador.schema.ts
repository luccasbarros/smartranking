import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: String,
    ranking: String,
    position: Number,
    urlPlayerPhoto: String,
  },
  { timestamps: true, collection: 'players' },
);
