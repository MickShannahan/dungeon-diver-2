import { watch } from "vue"
import { AppState } from "../AppState.js"
import { Card } from "../models/Card.js"
import { GameSave } from "../models/GameSave.js"
import { logger } from "../utils/Logger.js"
import { monsterPool } from "../data/monsterPool.js"
import { cardActions } from "./CardActions.js"
import { monstersService } from "./MonstersService.js"
import { delay } from "../utils/delay.js"
import { Animation } from "../models/Animation.js"
import { Action } from "../models/Action.js"
import Monster from "../components/Monster.vue"
import { stage1 } from "../data/stagePool.js"
import { stagesService } from "./stagesService.js"



class GameService {

  /** @param {Card} card*/
  async resolveActionOrder(card) {
    // playCard
    const player = AppState.player
    const monster = AppState.currentMonster
    // reduce energy
    player.energy -= card.cost
    // damage monster
    if (card.type != 'other')
      await monstersService.playCardAgainstMonster(card)
    // perform card actions
    let performed = card.actions.map(a => this.performCardAction(a))
    await Promise.all(performed)
    // check for monster death : end early
    if (!monster.isAlive) {
      delay(100)
      await monstersService.spawnNextMonster()
      return this.restoreEnergy(AppState.player.maxEnergy)
    }

    if (!monster.hasActions)
      await this.activatePlayerAbility()

    if (!player.hasEnergy)
      return this.playerTurnEnd()

    if (!monster.hasActions) {
      await monstersService.monsterPrepareTurn()
    }
  }

  /** @param {Action} action */
  async performCardAction(action) {
    await cardActions[action.action](action)
  }

  async playerTurnEnd() {
    logger.log('player turn end')
    await delay(300)
    if (!AppState.currentMonster.isAlive)
      return monstersService.spawnNextMonster()
    await monstersService.monsterTakeTurn()
    this.resetAbilityPower()
    this.restoreEnergy(AppState.player.maxEnergy)
  }

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

  async passTurn() {
    await gameService.reshuffleDiscard()
    await monstersService.monsterTakeTurn()
    await this.resetAbilityPower()
    await this.restoreEnergy(AppState.player.maxEnergy)
  }



  async activatePlayerAbility() {
    const player = AppState.player
    const abilityPower = player.abilityPower
    logger.log('💥', abilityPower)
    if (!abilityPower) return
    await delay(100)
    AppState.player.abilityAnimation = new Animation('ability-right', .2, 'linear')
    await delay(200)
    AppState.currentMonster.health -= abilityPower
    player.abilityPower = 0
    await delay(200)
  }

  /** @param {Card} card */
  playCard(card) {
    const indexToRemove = AppState.player.hand.indexOf(card)
    AppState.player.hand.splice(indexToRemove, 1)
    AppState.player.discard.unshift(card)
    this.resolveActionOrder(card)
  }

  async drawCard() {
    const player = AppState.player
    player.energy -= 1
    await this.addCardsToHand(1)
    if (!player.hasEnergy)
      return this.playerTurnEnd()
  }

  drawNewHand() {
    this.addCardsToHand(AppState.player.handSize)
  }

  async addCardsToHand(num) {
    logger.log('adding cards', num)
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      while (num--) {
        delay(100 * num, () => {
          const card = AppState.player.deck.shift()
          if (!card) return
          AppState.player.hand.push(card)
        })
      } (num)
      resolve()
    })
  }
  reshuffleDiscard() {
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
    stagesService.changeStage(stage1)
  }

  gotToMap() {

  }

  playerDies() {
    logger.log('💀💀💀💀')
  }



}

export const gameService = new GameService()
