import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  captain: string;
  members: string[];
  points: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    members: [{ type: String }],
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Team = mongoose.model<ITeam>('Team', teamSchema);

export default Team;
