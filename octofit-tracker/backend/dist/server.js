import express from 'express';
import mongoose from 'mongoose';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';
const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
function createResourceRouter(resourceName, model, sort) {
    const router = express.Router();
    router.get(`/${resourceName}`, async (_req, res) => {
        try {
            const data = await model.find().sort(sort ?? {}).exec();
            res.json({ resource: resourceName, count: data.length, data });
        }
        catch (error) {
            console.error(`Error loading ${resourceName}:`, error);
            res.status(500).json({ error: `Unable to load ${resourceName}` });
        }
    });
    router.post(`/${resourceName}`, async (req, res) => {
        try {
            const item = await model.create(req.body ?? {});
            res.status(201).json(item);
        }
        catch (error) {
            console.error(`Error creating ${resourceName} item:`, error);
            res.status(error instanceof mongoose.Error.ValidationError ? 400 : 500)
                .json({ error: `Unable to create ${resourceName} item` });
        }
    });
    router.get(`/${resourceName}/:id`, async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).json({ error: 'Invalid record id' });
            return;
        }
        try {
            const item = await model.findById(req.params.id).exec();
            if (!item) {
                res.status(404).json({ error: `${resourceName.slice(0, -1)} not found` });
                return;
            }
            res.json(item);
        }
        catch (error) {
            console.error(`Error loading ${resourceName} item:`, error);
            res.status(500).json({ error: `Unable to load ${resourceName} item` });
        }
    });
    router.put(`/${resourceName}/:id`, async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).json({ error: 'Invalid record id' });
            return;
        }
        try {
            const item = await model.findByIdAndUpdate(req.params.id, req.body ?? {}, {
                new: true,
                runValidators: true,
            }).exec();
            if (!item) {
                res.status(404).json({ error: `${resourceName.slice(0, -1)} not found` });
                return;
            }
            res.json(item);
        }
        catch (error) {
            console.error(`Error updating ${resourceName} item:`, error);
            res.status(error instanceof mongoose.Error.ValidationError ? 400 : 500)
                .json({ error: `Unable to update ${resourceName} item` });
        }
    });
    router.delete(`/${resourceName}/:id`, async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).json({ error: 'Invalid record id' });
            return;
        }
        try {
            const item = await model.findByIdAndDelete(req.params.id).exec();
            if (!item) {
                res.status(404).json({ error: `${resourceName.slice(0, -1)} not found` });
                return;
            }
            res.json({ deleted: item });
        }
        catch (error) {
            console.error(`Error deleting ${resourceName} item:`, error);
            res.status(500).json({ error: `Unable to delete ${resourceName} item` });
        }
    });
    return router;
}
app.get('/', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-tracker-api',
        apiBaseUrl,
        message: 'Welcome to the OctoFit Tracker API. Use /api/health to check service status.',
        port,
    });
});
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-tracker-api',
        port,
        apiBaseUrl,
    });
});
app.get('/api/config', (_req, res) => {
    res.json({
        apiBaseUrl,
        port,
        codespaceName: codespaceName ?? null,
    });
});
app.use('/api', createResourceRouter('users', User));
app.use('/api', createResourceRouter('teams', Team));
app.use('/api', createResourceRouter('activities', Activity));
app.use('/api', createResourceRouter('leaderboard', Leaderboard, { rank: 1 }));
app.use('/api', createResourceRouter('workouts', Workout));
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
mongoose
    .connect(mongoUri)
    .then(() => {
    console.log(`Connected to MongoDB at ${mongoUri}`);
    app.listen(port, '0.0.0.0', () => {
        console.log(`API listening on ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
