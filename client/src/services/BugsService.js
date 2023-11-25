import { AppState } from "../AppState.js"
import { Bug } from "../models/Bug.js"
import { api } from "./AxiosService.js"
import { trackedBugsService } from "./TrackedBugsService.js"

class BugsService {

  async getBugs() {
    AppState.activeBug = null
    let res = await api.get('api/bugs')
    AppState.bugs = res.data.map((bug) => new Bug(bug))
  }

  async getBugById(bugId) {
    AppState.activeBug = null
    let res = await api.get(`api/bugs/${bugId}`, bugId)
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

  clearAppState() {
    AppState.activeBug = null
    AppState.bugs.length = 0
    AppState.notes.length = 0
    AppState.trackedBugs.length = 0
    AppState.bugsUserIsTracking = 0
  }

}

export const bugsService = new BugsService()