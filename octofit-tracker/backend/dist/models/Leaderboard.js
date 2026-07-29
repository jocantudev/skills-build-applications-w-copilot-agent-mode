"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    period: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    totalPoints: { type: Number, required: true, min: 0 },
    activityCount: { type: Number, required: true, min: 0 },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
}, {
    timestamps: true,
});
const Leaderboard = mongoose_1.models.Leaderboard || (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = Leaderboard;
//# sourceMappingURL=Leaderboard.js.map