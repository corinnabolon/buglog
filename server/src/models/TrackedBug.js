import { Schema } from "mongoose";

export const TrackedBugSchema = new Schema(
  {
    bugId: { type: Schema.Types.ObjectId, ref: 'Bug', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TrackedBugSchema.virtual('bug', {
  localField: 'bugId',
  foreignField: '_id',
  ref: 'Bug',
  justOne: true
})

TrackedBugSchema.virtual('tracker', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

TrackedBugSchema.index({ bugId: 1, accountId: 1 }, { unique: true })