import { starterDeck } from "../utils/cardPool.js";
import { Animation } from "./Animation.js";
import { Character } from "./Character.js";
import { Card } from "./Card.js";
import { logger } from "../utils/Logger.js";
import { gameService } from "../services/GameService.js";
import { monstersService } from "../services/MonstersService.js";





export class Player extends Character {
  /**
   *
   * @param {{
   * handSize: Number,
   * maxHandSize: Number,
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

  get health() {
    return this._health
  }
  set health(value) {
    this._health = value < 0 ? 0 : value
    if (this._health == 0) {
      logger.log('[Player] Died')
    }
  }

  get isAlive() {
    return this._health > 0
  }

  get energy() { return this._energy }
  set energy(value) {
    this._energy = value < 0 ? 0 : value
    if (this._energy == 0) {
      logger.log('[Player] out of ⚡')
    }
  }
  get hasEnergy() {
    return this._energy > 0
  }

  get handCount() {
    return this.hand.length
  }

}
