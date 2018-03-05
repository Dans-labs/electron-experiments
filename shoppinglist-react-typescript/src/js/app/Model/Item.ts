import * as uuid from 'uuid/v4'

export class Item {
  public readonly id: string
  public readonly value: string
  public readonly done: boolean

  constructor(value: string, id: string = uuid(), done: boolean = false) {
    this.id = id
    this.value = value
    this.done = done
  }

  toggleDone(done: boolean) {
    return new Item(this.value, this.id, done)
  }
}
