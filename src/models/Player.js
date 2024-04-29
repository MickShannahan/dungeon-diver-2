import { starterDeck } from "../utils/cardPool.js";
import { Animation } from "./Animation.js";
import { Character } from "./Character.js";
import { Card } from "./Card.js";





export class Player extends Character {
  /**
   *
   * @param {{
   * handSize: [Number],
   * maxHandSize: [Number],
   * deck: Card[],
   * hand: Card[],
   * discard: Card[],
   * abilityAnimation: Animation
   * }} data
   */
  constructor(data) {
    // @ts-ignore
    super(data)
    this.handSize = data.handSize || 5
    this.maxHandSize = data.maxHandSize || 10
    this.deck = data.deck || starterDeck()
    this.hand = data.hand || []
    this.discard = data.discard || []
    this.abilityPower = 0
    this.abilityAnimation = data.abilityAnimation
  }

  shuffleDeck() {
    this.deck.sort(() => Math.random() - .5)
    this.deck.sort(() => Math.random() - .5)
    this.deck.sort(() => Math.random() - .5)
  }
}
