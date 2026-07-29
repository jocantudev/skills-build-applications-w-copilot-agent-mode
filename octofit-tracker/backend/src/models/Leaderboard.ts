import { InferSchemaType, Schema, model, models } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    totalPoints: { type: Number, required: true, min: 0 },
    activityCount: { type: Number, required: true, min: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  },
  {
    timestamps: true,
  },
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const Leaderboard = models.Leaderboard || model('Leaderboard', leaderboardSchema);

export default Leaderboard;