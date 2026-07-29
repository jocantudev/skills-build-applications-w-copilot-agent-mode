import { Router } from 'express';

import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const items = await Workout.find().sort({ level: 1, durationMinutes: 1 }).lean();

    res.status(200).json({
      resource: 'workouts',
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
});

export default router;