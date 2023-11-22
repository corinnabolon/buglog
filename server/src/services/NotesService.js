import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class NotesService {

  async createNote(noteData) {
    let note = await dbContext.Notes.create(noteData)
    await note.populate("creator", "name picture")
    return note
  }

  async getAllNotesByBugId(bugId) {
    let notes = await dbContext.Notes.find({ bugId: bugId })
      //find the notes where the notes's bugId is the bugId I am passing down
      .populate("creator", "name picture")
    return notes
  }

  async removeNote(noteId, userId) {
    let note = await dbContext.Notes.findById(noteId)
    if (!note) {
      throw new BadRequest(`${noteId} is not a valid note ID`)
    }
    if (note.creatorId.toString() != userId) {
      throw new Forbidden(`Not your note to delete`)
    }
    await note.delete()
    return `Note deleted`
  }

}

export const notesService = new NotesService()