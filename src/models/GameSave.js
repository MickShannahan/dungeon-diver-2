import { createId } from "../utils/GenerateId.js"
import { Card } from './Card.js'


export class GameSave {
  constructor(data) {
    this.name = data.name
    this.id = data.id || createId(data.name)
    this.stage = data.stage || 1
    this.money = data.money || 0
    this.deck = data.deck ? data.deck.map(d => new Card(d)) : []
    this.cardPool = data.cardPool ? data.cardPool.map(c => new Card(c)) : []
  }
}
