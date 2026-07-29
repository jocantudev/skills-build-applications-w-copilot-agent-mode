"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const items = await Team_1.default.find()
            .populate('captain', 'name email')
            .populate('members', 'name fitnessLevel')
            .sort({ name: 1 })
            .lean();
        res.status(200).json({
            resource: 'teams',
            count: items.length,
            items,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=teams.js.map