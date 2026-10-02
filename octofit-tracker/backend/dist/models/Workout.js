import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
}, { timestamps: true });
const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
