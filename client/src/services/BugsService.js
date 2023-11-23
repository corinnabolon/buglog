import { AppState } from "../AppState.js"
import { Bug } from "../models/Bug.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

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
    let res = api.delete(`api/bugs/${bugId}`)
    AppState.activeBug = new Bug(res.data)
  }

}

export const bugsService = new BugsService()