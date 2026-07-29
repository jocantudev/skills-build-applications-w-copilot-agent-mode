import { InferSchemaType, Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = models.Workout || model('Workout', workoutSchema);

export default Workout;