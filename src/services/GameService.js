import { watch } from "vue"
import { AppState } from "../AppState.js"
import { Card } from "../models/Card.js"
import { GameSave } from "../models/GameSave.js"
import { logger } from "../utils/Logger.js"
import { monsterPool } from "../utils/monsterPool.js"
import { cardActions } from "./CardActions.js"
import { monstersService } from "./MonstersService.js"

class GameService {
  healPlayer(health) {
    const player = AppState.player
    player.health += health
  }

  restoreEnergy(eng) {
    AppState.player.energy += eng
    if (AppState.player.energy > AppState.player.maxEnergy) AppState.player.energy = AppState.player.maxEnergy
  }

  passTurn() {
    monstersService.monsterTakeTurn()
  }

  activateCombo() {
    setTimeout(() => {
      monstersService.monsterPrepareTurn()
    }, 1000)
  }

  /** @param {Card} card */
  playCard(card) {
    AppState.player.energy -= card.cost
    card.actions.forEach(a => cardActions[a.action](a))
    if (card.type != 'other') monstersService.counterActions(card)
    const indexToRemove = AppState.player.hand.indexOf(card)
    AppState.player.hand.splice(indexToRemove, 1)
    AppState.player.discard.unshift(card)
    if (AppState.player.hand.length <= 0) {
      this.drawNewHand()
    }
    if (card.type != 'other') {
      return card.power
    }
  }

  drawNewHand() {
    this.addCardsToHand(AppState.player.handSize)
  }

  async addCardsToHand(num) {
    logger.log('adding cards', num)
    while (--num + 1) {
      if (AppState.player.maxHandSize <= AppState.player.hand.length) return
      const card = AppState.player.deck.shift()
      if (!card) return await this.reshuffleDiscard()
      AppState.player.hand.push(card)
    } (num)
  }
  reshuffleDiscard() {
    logger.log('reshuffling')
    const player = AppState.player
    return new Promise((resolve, reject) => {
      player.discard.forEach((card, i) => {
        setTimeout(() => {
          logger.log(card)
          player.deck.push(card)
        }, 100 * i)
      })
      setTimeout(() => {
        logger.log('done reshuffling')
        player.discard.length = 0
        resolve()
      }, 100 * player.discard.length)
    })
  }

  damagePlayer(damage) {
    const player = AppState.player
    player.health -= damage
    if (player.health <= 0) {
      this.playerDies()
    }
  }

  startNewRun() {
    const gameSave = new GameSave(AppState.player)
    AppState.gameSave = gameSave
    const monsters = monsterPool.slice(0, 5)
    AppState.monsters = monsters
    monstersService.spawnNextMonster()
  }

  gotToMap() {

  }

  playerDies() {
    logger.log('💀💀💀💀')
  }



}

export const gameService = new GameService()
