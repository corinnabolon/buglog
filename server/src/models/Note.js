import { Schema } from "mongoose";

export const NoteSchema = new Schema(
  {
    body: { type: String, required: true, maxLength: 1000 },
    bugId: { type: Schema.Types.ObjectId, ref: 'Bug', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  })

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})