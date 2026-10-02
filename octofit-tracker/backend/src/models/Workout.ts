import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
