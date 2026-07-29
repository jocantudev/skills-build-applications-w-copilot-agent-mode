import { Router } from 'express';

import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const items = await Team.find()
      .populate('captain', 'name email')
      .populate('members', 'name fitnessLevel')
      .sort({ name: 1 })
      .lean();

    res.status(200).json({
      resource: 'teams',
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
});

export default router;