import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { trackedBugsService } from "../services/TrackedBugsService.js"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/trackedbugs', this.getLoggedInUsersTrackedBugs)

  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getLoggedInUsersTrackedBugs(req, res, next) {
    try {
      let userId = req.userInfo.id
      let trackedBugs = await trackedBugsService.getLoggedInUsersTrackedBugs(userId)
      res.send(trackedBugs)
    } catch (error) {
      next(error)
    }
  }

}
