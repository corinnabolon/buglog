import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {

  async createBug(bugData) {
    let bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

  async getAllBugs() {
    let bugs = await dbContext.Bugs.find().sort({ updatedAt: -1 })
      .populate('creator', 'name picture')
    return bugs
  }

  async getBugById(bugId) {
    let bug = await dbContext.Bugs.findById(bugId).populate("creator", "name picture")
    if (!bug) {
      throw new BadRequest(`${bugId} is not a valid bugId`)
    }
    return bug
  }

  async editBug(userId, bugData, bugId) {
    let bugToUpdate = await dbContext.Bugs.findById(bugId)
    if (!bugToUpdate) {
      throw new BadRequest(`There is no bug with the ID ${bugId}`)
    }
    if (bugToUpdate.creatorId.toString() != userId) {
      throw new Forbidden(`Not your bug to update`)
    }

    bugToUpdate.title = bugData.title || bugToUpdate.title
    bugToUpdate.description = bugData.description || bugToUpdate.description
    bugToUpdate.priority = bugData.priority || bugToUpdate.priority
    bugToUpdate.closed = bugData.closed != undefined ? bugData.closed : bugToUpdate.closed
    bugToUpdate.closedDate = bugData.closedData || bugToUpdate.closedDate

    await bugToUpdate.save()

    return bugToUpdate
  }

  async closeBug(userId, bugId) {
    let bugToClose = await this.getBugById(bugId)
    if (bugToClose.closed == true) {
      throw new BadRequest(`This bug has already been closed`)
    }
    if (bugToClose.creatorId.toString() != userId) {
      throw new Forbidden(`Not your bug to close`)
    }
    bugToClose.closed = true
    bugToClose.closedDate = new Date()
    await bugToClose.save()
    return bugToClose
  }
  //TODO: come back to delete test


}

export const bugsService = new BugsService()