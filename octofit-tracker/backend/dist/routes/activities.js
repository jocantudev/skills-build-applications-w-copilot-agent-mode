"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const items = await Activity_1.default.find()
            .populate('user', 'name fitnessLevel')
            .populate('team', 'name')
            .sort({ completedAt: -1 })
            .lean();
        res.status(200).json({
            resource: 'activities',
            count: items.length,
            items,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=activities.js.map