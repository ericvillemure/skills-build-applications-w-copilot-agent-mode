import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: string;
  name: string;
  points: number;
  rank: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
  },
  { timestamps: true },
);

const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);

export default Leaderboard;
