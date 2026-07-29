import { Router } from 'express';

import User from '../models/User';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const items = await User.find().populate('team', 'name city sportFocus').sort({ name: 1 }).lean();

    res.status(200).json({
      resource: 'users',
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
});

export default router;