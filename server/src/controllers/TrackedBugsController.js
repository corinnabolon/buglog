import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugsService } from "../services/TrackedBugsService.js";
import BaseController from "../utils/BaseController.js";


export class TrackedBugsController extends BaseController {

  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
      .delete('/:trackedBugId', this.removeTrackedBug)
  }

  async createTrackedBug(req, res, next) {
    try {
      let trackedBugData = req.body
      let userId = req.userInfo.id
      trackedBugData.accountId = userId
      let trackedBug = await trackedBugsService.createTrackedBug(trackedBugData, userId)
      return res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }

  async removeTrackedBug(req, res, next) {
    try {
      let userId = req.userInfo.id
      let trackedBugId = req.params.trackedBugId
      let message = await trackedBugsService.removeTrackedBug(userId, trackedBugId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }




}