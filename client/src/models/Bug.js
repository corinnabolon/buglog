export class Bug {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.priority = data.priority
    this.closed = data.closed
    this.closedDate = data.closedDate || null
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

}