import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugsService } from "../services/TrackedBugsService.js";
import BaseController from "../utils/BaseController.js";


export class TrackedBugsController extends BaseController {

  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
  }

  async createTrackedBug(req, res, next) {
    try {
      let trackedBugData = req.body
      let userId = req.userInfo.id
      trackedBugData.accountId = userId
      let trackedBug = await trackedBugsService.createTrackedBug(trackedBugData)
      return res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }




}