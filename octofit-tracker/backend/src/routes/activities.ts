import { Router } from 'express';

import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const items = await Activity.find()
      .populate('user', 'name fitnessLevel')
      .populate('team', 'name')
      .sort({ completedAt: -1 })
      .lean();

    res.status(200).json({
      resource: 'activities',
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
});

export default router;