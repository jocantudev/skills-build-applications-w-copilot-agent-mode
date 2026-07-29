"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    level: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: [{ type: String, required: true, trim: true }],
    description: { type: String, required: true, trim: true },
}, {
    timestamps: true,
});
const Workout = mongoose_1.models.Workout || (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
//# sourceMappingURL=Workout.js.map