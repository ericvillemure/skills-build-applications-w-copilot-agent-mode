import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: String, required: true },
    type: { type: String, required: true },
    minutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
