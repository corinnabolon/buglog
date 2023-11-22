export class Note {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.bugId = data.bugId
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}