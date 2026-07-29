"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const items = await Workout_1.default.find().sort({ level: 1, durationMinutes: 1 }).lean();
        res.status(200).json({
            resource: 'workouts',
            count: items.length,
            items,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=workouts.js.map