import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Avery Stone',
                email: 'avery.stone@octofit.example',
                password: 'secret123',
                team: 'Storm Riders',
                role: 'captain',
                level: 'advanced',
                points: 840,
            },
            {
                name: 'Jordan Lee',
                email: 'jordan.lee@octofit.example',
                password: 'secret123',
                team: 'Peak Performers',
                role: 'student',
                level: 'intermediate',
                points: 765,
            },
            {
                name: 'Mila Chen',
                email: 'mila.chen@octofit.example',
                password: 'secret123',
                team: 'Storm Riders',
                role: 'student',
                level: 'advanced',
                points: 702,
            },
        ]);
        const teams = await Team.insertMany([
            {
                name: 'Storm Riders',
                captain: 'Avery Stone',
                members: ['Avery Stone', 'Mila Chen', 'Noah Patel'],
                points: 1280,
            },
            {
                name: 'Peak Performers',
                captain: 'Jordan Lee',
                members: ['Jordan Lee', 'Sofia Ramos', 'Leo Martin'],
                points: 1195,
            },
        ]);
        const activities = await Activity.insertMany([
            {
                user: 'Avery Stone',
                type: 'Running',
                minutes: 32,
                calories: 290,
                date: new Date('2026-10-02T08:15:00Z'),
            },
            {
                user: 'Jordan Lee',
                type: 'Cycling',
                minutes: 45,
                calories: 360,
                date: new Date('2026-10-02T07:30:00Z'),
            },
            {
                user: 'Mila Chen',
                type: 'Strength',
                minutes: 50,
                calories: 420,
                date: new Date('2026-10-02T09:10:00Z'),
            },
        ]);
        const leaderboard = await Leaderboard.insertMany([
            {
                userId: String(users[0]._id),
                name: 'Avery Stone',
                points: 840,
                rank: 1,
            },
            {
                userId: String(users[1]._id),
                name: 'Jordan Lee',
                points: 765,
                rank: 2,
            },
            {
                userId: String(users[2]._id),
                name: 'Mila Chen',
                points: 702,
                rank: 3,
            },
        ]);
        const workouts = await Workout.insertMany([
            {
                title: 'Tempo Run',
                category: 'Cardio',
                difficulty: 'Moderate',
                durationMinutes: 30,
            },
            {
                title: 'Upper Body Circuit',
                category: 'Strength',
                difficulty: 'Challenging',
                durationMinutes: 40,
            },
            {
                title: 'Mobility Flow',
                category: 'Recovery',
                difficulty: 'Easy',
                durationMinutes: 20,
            },
        ]);
        console.log('Seed the octofit_db database with test data');
        console.log('Inserted users:', users.length);
        console.log('Inserted teams:', teams.length);
        console.log('Inserted activities:', activities.length);
        console.log('Inserted leaderboard entries:', leaderboard.length);
        console.log('Inserted workouts:', workouts.length);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
