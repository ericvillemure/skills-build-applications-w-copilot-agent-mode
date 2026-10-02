import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    members: [{ type: String }],
    points: { type: Number, default: 0 },
}, { timestamps: true });
const Team = mongoose.model('Team', teamSchema);
export default Team;
