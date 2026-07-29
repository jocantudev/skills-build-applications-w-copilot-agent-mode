import { Router } from 'express';

import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const entries = await Leaderboard.find()
      .populate('user', 'name')
      .populate('team', 'name city')
      .sort({ rank: 1 })
      .lean();

    res.status(200).json({
      resource: 'leaderboard',
      count: entries.length,
      entries,
    });
  } catch (error) {
    next(error);
  }
});

export default router;