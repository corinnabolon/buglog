import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"

class NotesService {

  async getNotesByBugId(bugId) {
    let res = await api.get(`api/bugs/${bugId}/notes`)
    AppState.notes = res.data.map((note) => new Note(note))
  }

  async createNote(noteData) {
    let res = await api.post(`api/notes`, noteData)
    AppState.notes.push(new Note(res.data))
  }

  async removeNote(noteId) {
    let res = await api.delete(`api/notes/${noteId}`)
    let noteIndex = AppState.notes.findIndex(note => note.id == noteId)

    AppState.notes.splice(noteIndex, 1)
  }

}

export const notesService = new NotesService()