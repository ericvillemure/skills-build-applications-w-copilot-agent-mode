import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
}, { timestamps: true });
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export default Leaderboard;
