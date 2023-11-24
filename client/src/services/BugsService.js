import { AppState } from "../AppState.js"
import { Bug } from "../models/Bug.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { trackedBugsService } from "./TrackedBugsService.js"
import { TrackedBug } from "../models/TrackedBug.js"

class BugsService {

  async getBugs() {
    let res = await api.get('api/bugs')
    logger.log(res.data)
    AppState.bugs = res.data.map((bug) => new Bug(bug))
  }

  async getBugById(bugId) {
    AppState.activeBug = null
    let res = await api.get(`api/bugs/${bugId}`, bugId)
    logger.log("Got bug", res.data)
    AppState.activeBug = new Bug(res.data)
  }

  async closeBug(bugId) {
    await trackedBugsService.deleteAllTrackersOfBug()
    let res = await api.delete(`api/bugs/${bugId}`)
    AppState.activeBug = new Bug(res.data)
  }

  async createBug(bugData) {
    let res = await api.post(`api/bugs`, bugData)
    let newBug = new Bug(res.data)
    AppState.bugs.push(newBug)
    return newBug
  }

  async editBug(bugData, bugId) {
    let res = await api.put(`api/bugs/${bugId}`, bugData)
    this.getBugById(bugId)
  }

}

export const bugsService = new BugsService()