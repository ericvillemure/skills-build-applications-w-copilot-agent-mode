import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    team: { type: String, required: true },
    role: { type: String, default: 'student' },
    level: { type: String, default: 'beginner' },
    points: { type: Number, default: 0 },
}, {
    timestamps: true,
    toJSON: {
        transform: (_document, returnedObject) => {
            delete returnedObject.password;
            return returnedObject;
        },
    },
});
const User = mongoose.model('User', userSchema);
export default User;
