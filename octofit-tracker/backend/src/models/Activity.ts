import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  user: string;
  type: string;
  minutes: number;
  calories: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    minutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
