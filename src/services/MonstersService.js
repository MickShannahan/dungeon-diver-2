import { AppState } from "../AppState.js"
import { Animation } from "../models/Animation.js"
import { Card } from "../models/Card.js"
import { animate } from "../utils/animate.js"
import { delay } from "../utils/delay.js"
import { logger } from "../utils/Logger.js"
import { playSFX } from "../utils/soundController.js"
import { cardActions } from "./CardActions.js"
import { gameService } from "./GameService.js"


export const rpsOutcomes = {
  rock: ['scissors', 'other'],
  paper: ['rock', 'other'],
  scissors: ['paper', 'other'],
  other: ['rock', 'paper', 'scissors']
}



class MonstersService {

  async spawnNextMonster() {
    AppState.currentMonster = null
    await delay(100)
    const monster = AppState.monsters.shift()
    logger.log('✨👹', monster)
    if (!monster) return gameService.gotToMap()
    AppState.currentMonster = monster
    logger.log('spawnNextMonster')
    this.monsterPrepareTurn()
  }

  monsterPrepareTurn() {
    logger.log('preparing next turn')
    AppState.currentMonster.prepareActions()
  }

  async monsterTakeTurn() {
    logger.log('monsterTakeTurn')
    const monster = AppState.currentMonster
    if (!monster.isAlive) return
    let actions = AppState.currentMonster.actions
    actions.forEach(a => a.animation = new Animation('grow', .2))
    actions.forEach((a, i) => {
      delay(400 * (i + 1), async () => {
        cardActions[a.action](a)
        a.animation = new Animation('shoot-left', .3, 'ease', .1, () => {
          AppState.currentMonster.removeCurrentAction()
        })
      })
    })
    await delay((500 * actions.length) + 300)
    actions.length = 0
    this.monsterPrepareTurn()
  }

  async counterActions(card) {
    const monster = AppState.currentMonster
    const action = monster?.actions[0]
    const currentPower = AppState.player?.abilityPower
    logger.log('counterActions [', card.type, 'vs', action.type + ']')
    if (!action) {
      this.monsterPrepareTurn()
    }

    if (card.type == action.type) { // ties
      action.power -= card.power
      action.animation = new Animation('drop-down', .2, 'linear', 0)
      if (action.power < 0) {
        monster.health -= Math.abs(action.power)
      }

    } else if (rpsOutcomes[card.type].includes(action.type)) { // player wins
      action.power -= card.power
      monster.health -= card.power
      AppState.player.abilityPower += card.cost

    } else { // player loses
      gameService.damagePlayer(1)
      action.animation = new Animation('grow', .2, 'linear', 0)
      action.power = Math.ceil(action.power / 2)
      if (!monster.actions.length) {
        monster.actions.shift()
        monster.actions.push(action)
      }
    }

    if (action.power <= 0) {
      action.power = 0
      action.animation = new Animation('bounce', .2, 'linear', 0, () => {
        monster.removeAction(action)
      })
      await delay(300)
    }

  }

  /** @param {Card} card */
  async playCardAgainstMonster(card) {
    const monster = AppState.currentMonster
    await this.counterActions(card)
    return monster.health
  }




}

export const monstersService = new MonstersService()
