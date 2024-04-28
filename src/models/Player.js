import { starterDeck } from "../utils/cardPool.js";
import { Character } from "./Character.js";





export class Player extends Character {
  constructor(data) {
    super(data)
    this.handSize = data.handSize || 5
    this.maxHandSize = data.maxHandSize || 10
    this.deck = data.deck || starterDeck()
    this.hand = data.hand || []
    this.discard = data.discard || []
  }

  shuffleDeck() {
    this.deck.sort(() => Math.random() - .5)
    this.deck.sort(() => Math.random() - .5)
    this.deck.sort(() => Math.random() - .5)
  }
}
