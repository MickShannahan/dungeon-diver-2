import { watch } from "vue"
import { AppState } from "../AppState.js"
import { Card } from "../models/Card.js"
import { GameSave } from "../models/GameSave.js"
import { logger } from "../utils/Logger.js"
import { monsterPool } from "../utils/monsterPool.js"
import { cardActions } from "./CardActions.js"
import { monstersService } from "./MonstersService.js"
import { delay } from "../utils/delay.js"
import { Animation } from "../models/Animation.js"

class GameService {
  discardCard(card) {
    const player = AppState.player
    let removed = player.hand.splice(player.hand.indexOf(card), 1)[0]
    player.discard.push(removed)
    this.restoreEnergy(1)
  }
  burnCard(card) {
    const player = AppState.player
    player.hand.splice(player.hand.indexOf(card), 1)
  }

  healPlayer(health) {
    const player = AppState.player
    player.health += health
  }

  restoreEnergy(eng) {
    AppState.player.energy += eng
    if (AppState.player.energy > AppState.player.maxEnergy) AppState.player.energy = AppState.player.maxEnergy
  }

  resetAbilityPower() {
    const player = AppState.player
    player.abilityAnimation = new Animation('flash-shake', .5, 'linear', 0, () => {
      player.abilityPower = 0
    })
  }

  passTurn() {
    gameService.reshuffleDiscard()
    monstersService.monsterTakeTurn()
  }

  playerTurnEnd() {
    if (!AppState.currentMonster) return
    setTimeout(() => {
      if (AppState.player.energy <= 0) {
        monstersService.monsterTakeTurn()
        this.resetAbilityPower()
      }
    }, 500)
  }

  async activatePlayerAbility() {
    const abilityPower = AppState.player.abilityPower || 0
    if (!abilityPower) return
    await delay(100)
    AppState.player.abilityAnimation = new Animation('ability-right', .2, 'linear')
    await delay(200)
    monstersService.damageCurrentMonster(abilityPower)
    AppState.player.abilityPower = 0
    monstersService.monsterPrepareTurn()

    await delay(500)
  }

  /** @param {Card} card */
  playCard(card) {
    AppState.player.energy -= card.cost
    card.actions.forEach(a => cardActions[a.action](a))
    if (card.type != 'other') monstersService.counterActions(card)
    logger.log(card)
    const indexToRemove = AppState.player.hand.indexOf(card)
    AppState.player.hand.splice(indexToRemove, 1)
    AppState.player.discard.unshift(card)

    if (AppState.player.energy <= 0) this.playerTurnEnd()

    if (card.type != 'other') {
      return card.power
    }
  }

  drawNewHand() {
    this.addCardsToHand(AppState.player.handSize)
  }

  async addCardsToHand(num) {
    logger.log('adding cards', num)
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      while (num--) {
        setTimeout(() => {
          const card = AppState.player.deck.shift()
          if (!card) return
          AppState.player.hand.push(card)
          resolve()
        }, 100 * num)
      } (num)
    })
  }
  reshuffleDiscard() {
    logger.log('reshuffling')
    const player = AppState.player
    this.resetAbilityPower()
    return new Promise((resolve, reject) => {
      player.discard.forEach((card, i) => {
        setTimeout(() => {
          player.deck.push(card)
        }, 100 * i)
      })
      setTimeout(() => {
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
    const monsters = monsterPool
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
