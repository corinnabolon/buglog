import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { bugsService } from "./BugsService.js"

class TrackedBugsService {

  async createTrackedBug(trackedBugData) {
    let bug = await bugsService.getBugById(trackedBugData.bugId)

    if (bug.closed) {
      throw new Forbidden(`${bug.title} has already been closed`)
    }
    let trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate("tracker", "name picture")
    await trackedBug.populate("bug")
    return trackedBug
  }

  async getUsersTrackingABug(bugId) {
    let users = await dbContext.TrackedBugs.find({ bugId: bugId }).populate("tracker", "name picture")
    return users
  }

}

export const trackedBugsService = new TrackedBugsService()