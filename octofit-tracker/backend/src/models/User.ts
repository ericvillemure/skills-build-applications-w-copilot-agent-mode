import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  team: string;
  role: string;
  level: string;
  points: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    team: { type: String, required: true },
    role: { type: String, default: 'student' },
    level: { type: String, default: 'beginner' },
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
