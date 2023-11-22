import BaseController from "../utils/BaseController.js";
import { bugsService } from "../services/BugsService.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.closeBug)
  }

  async createBug(req, res, next) {
    try {
      let bugData = req.body
      let userId = req.userInfo.id
      bugData.creatorId = userId
      let bug = await bugsService.createBug(bugData)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getAllBugs(req, res, next) {
    try {
      let bugs = await bugsService.getAllBugs()
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      let bugId = req.params.bugId
      let bug = await bugsService.getBugById(bugId)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      let userId = req.userInfo.id
      let bugData = req.body
      let bugId = req.params.bugId
      let updatedBug = await bugsService.editBug(userId, bugData, bugId)
      return res.send(updatedBug)
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      let userId = req.userInfo.id
      let bugId = req.params.bugId
      let closedBug = await bugsService.closeBug(userId, bugId)
      return res.send(closedBug)
    } catch (error) {
      next(error)
    }
  }

}