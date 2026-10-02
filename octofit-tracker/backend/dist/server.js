import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
function createResourceRouter(resourceName, initialData) {
    const router = express.Router();
    const collection = [...initialData];
    const getNextId = () => {
        const highestId = collection.reduce((max, item) => {
            const numericId = Number(item.id ?? 0);
            return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
        }, 0);
        return highestId + 1;
    };
    router.get(`/${resourceName}`, (_req, res) => {
        res.json({
            resource: resourceName,
            count: collection.length,
            data: collection,
        });
    });
    router.post(`/${resourceName}`, (req, res) => {
        const payload = req.body ?? {};
        const item = { id: getNextId(), ...payload };
        collection.push(item);
        res.status(201).json(item);
    });
    router.get(`/${resourceName}/:id`, (req, res) => {
        const item = collection.find((entry) => String(entry.id) === req.params.id);
        if (!item) {
            res.status(404).json({ error: `${resourceName.slice(0, -1)} not found` });
            return;
        }
        res.json(item);
    });
    router.put(`/${resourceName}/:id`, (req, res) => {
        const index = collection.findIndex((entry) => String(entry.id) === req.params.id);
        if (index === -1) {
            res.status(404).json({ error: `${resourceName.slice(0, -1)} not found` });
            return;
        }
        const updated = { ...collection[index], ...req.body, id: collection[index].id };
        collection[index] = updated;
        res.json(updated);
    });
    router.delete(`/${resourceName}/:id`, (req, res) => {
        const index = collection.findIndex((entry) => String(entry.id) === req.params.id);
        if (index === -1) {
            res.status(404).json({ error: `${resourceName.slice(0, -1)} not found` });
            return;
        }
        const [removed] = collection.splice(index, 1);
        res.json({ deleted: removed });
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
app.use('/api', createResourceRouter('users', [
    { id: 1, name: 'Avery Stone', email: 'avery@octofit.com', level: 'advanced', team: 'Storm Riders' },
    { id: 2, name: 'Jordan Lee', email: 'jordan@octofit.com', level: 'intermediate', team: 'Peak Performers' },
]));
app.use('/api', createResourceRouter('teams', [
    { id: 1, name: 'Storm Riders', points: 1280, members: 7 },
    { id: 2, name: 'Peak Performers', points: 1195, members: 6 },
]));
app.use('/api', createResourceRouter('activities', [
    { id: 1, type: 'Running', minutes: 28, calories: 260, date: '2026-10-02' },
    { id: 2, type: 'Strength', minutes: 45, calories: 320, date: '2026-10-02' },
]));
app.use('/api', createResourceRouter('leaderboard', [
    { id: 1, rank: 1, name: 'Avery Stone', points: 840 },
    { id: 2, rank: 2, name: 'Jordan Lee', points: 765 },
    { id: 3, rank: 3, name: 'Mila Chen', points: 702 },
]));
app.use('/api', createResourceRouter('workouts', [
    { id: 1, title: 'Tempo Run', difficulty: 'Moderate', durationMinutes: 30 },
    { id: 2, title: 'Upper Body Circuit', difficulty: 'Challenging', durationMinutes: 40 },
]));
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
