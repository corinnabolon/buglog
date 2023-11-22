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

}

export const bugsService = new BugsService()