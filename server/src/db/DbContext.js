import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { BugSchema } from '../models/Bug'
import { TrackedBugSchema } from "../models/TrackedBug.js";
import { NoteSchema } from "../models/Note.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Bugs = mongoose.model('Bug', BugSchema);

  TrackedBugs = mongoose.model('TrackedBug', TrackedBugSchema);

  Notes = mongoose.model('Note', NoteSchema);
}

export const dbContext = new DbContext()
