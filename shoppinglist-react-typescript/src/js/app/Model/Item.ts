import * as uuid from 'uuid/v4'

export class Item {
  public readonly id: string
  public readonly value: string

  constructor(value: string, id: string = uuid()) {
    this.id = id
    this.value = value
  }
}
