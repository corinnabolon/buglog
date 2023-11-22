import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { bugsService } from "./BugsService.js"

class TrackedBugsService {

  async createTrackedBug(trackedBugData, userId) {
    let bug = await bugsService.getBugById(trackedBugData.bugId)

    if (bug.closed) {
      throw new Forbidden(`${bug.title} has already been closed`)
    }
    let myTrackedBugs = await dbContext.TrackedBugs.find({ accountId: userId })
    myTrackedBugs.forEach((trackedBug) => {
      if (trackedBug.bugId == trackedBugData.bugId) {
        throw new BadRequest(`You can't track the same bug twice.`)
      }
    })
    let trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate("tracker", "name picture")
    await trackedBug.populate("bug")
    return trackedBug
  }

  async getUsersTrackingABug(bugId) {
    let users = await dbContext.TrackedBugs.find({ bugId: bugId }).populate("tracker", "name picture")
    return users
  }

  async getLoggedInUsersTrackedBugs(userId) {
    let trackedBugs = await dbContext.TrackedBugs.find({ accountId: userId })
      .populate("bug")
    return trackedBugs
  }

  async removeTrackedBug(userId, trackedBugId) {
    let trackedBug = await dbContext.TrackedBugs.findById(trackedBugId)
    if (!trackedBug) {
      throw new BadRequest(`Cannot find tracked bug with ID ${trackedBugId} `)
    }
    if (trackedBug.accountId.toString() != userId) {
      throw new Forbidden(`Not your tracked bug to delete`)
    }
    await trackedBug.delete()
    return `No longer tracking this bug`
  }

}

export const trackedBugsService = new TrackedBugsService()