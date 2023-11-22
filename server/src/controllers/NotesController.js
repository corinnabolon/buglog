import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class NotesController extends BaseController {

  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.removeNote)
  }

  async createNote(req, res, next) {
    try {
      let noteData = req.body
      let userId = req.userInfo.id
      noteData.creatorId = userId
      let note = await notesService.createNote(noteData)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async removeNote(req, res, next) {
    try {
      let noteId = req.params.noteId
      let userId = req.userInfo.id
      let message = await notesService.removeNote(noteId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }


}