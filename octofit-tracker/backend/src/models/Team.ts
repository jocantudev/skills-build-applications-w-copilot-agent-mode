import { InferSchemaType, Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    sportFocus: { type: String, required: true, trim: true },
    captain: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = models.Team || model('Team', teamSchema);

export default Team;