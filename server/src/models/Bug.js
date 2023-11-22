import { Schema } from "mongoose";

export const BugSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 30 },
    description: { type: String, required: true, maxLength: 1000 },
    priority: { type: Number, required: true, min: 1, max: 5 },
    closed: { type: Boolean, required: true, default: false },
    closedDate: { type: Date },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)

BugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})


// From Jeremy's code:
// BugSchema.post('save', doc => {
//   if (doc.closed) {
//     doc.closedDate = new Date()
//     doc.save()
//   }
// })