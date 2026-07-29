"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const entries = await Leaderboard_1.default.find()
            .populate('user', 'name')
            .populate('team', 'name city')
            .sort({ rank: 1 })
            .lean();
        res.status(200).json({
            resource: 'leaderboard',
            count: entries.length,
            entries,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map