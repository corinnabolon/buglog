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

}

export const notesService = new NotesService()