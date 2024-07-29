import { UniqueEntityId } from "./unique-entity-id"

export class Entity<EntityProps> {
  private _id: UniqueEntityId
  protected props: EntityProps

  constructor(props: EntityProps, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = props
  }

  get id() {
    return this._id
  }
}
