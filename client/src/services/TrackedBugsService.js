import { AppState } from "../AppState.js"
import { TrackedBug } from "../models/TrackedBug.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TrackedBugsService {

  async getTrackersOfBug(bugId) {
    let res = await api.get(`api/bugs/${bugId}/trackedbugs`)
    logger.log("Got trackers", res.data)
    AppState.trackedBugs = res.data.map((trackedBug) => new TrackedBug(trackedBug))
  }

}

export const trackedBugsService = new TrackedBugsService()