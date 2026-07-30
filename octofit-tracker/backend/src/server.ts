import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { getApiBaseUrl, apiPort } from './config/baseUrl';
import db from './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();
const port = apiPort;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  const readyState = db.readyState;
  const baseUrl = getApiBaseUrl();

  res.status(200).json({
    status: 'ok',
    baseUrl,
    mongodbReadyState: readyState,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend running on ${getApiBaseUrl()}`);
});
