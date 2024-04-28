import { AppState } from "../AppState.js"
import { Animation } from "../models/Animation.js"
import { animate } from "../utils/animate.js"
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

  spawnNextMonster() {
    const monster = AppState.monsters.shift()
    logger.log('✨👹', monster)
    if (!monster) return gameService.gotToMap()
    AppState.currentMonster = monster
    this.monsterPrepareTurn()
  }

  monsterPrepareTurn() {
    AppState.currentMonster.prepareActions()
  }

  monsterTakeTurn() {
    let actions = AppState.currentMonster.actions
    actions.forEach((a, i) => {
      setTimeout(() => {
        a.triggered = true
        cardActions[a.action](a)
        a.animation = new Animation('shoot-left', .3, 'ease', .1)
      }, 400 * (i + 1))
    })
    setTimeout(() => {
      gameService.addCardsToHand(3)
      gameService.restoreEnergy(AppState.player.maxEnergy)
      actions.length = 0
      this.monsterPrepareTurn()
    }, (400 * actions.length) + 300)
  }

  counterActions(card) {
    const monster = AppState.currentMonster
    const action = monster?.actions[0]
    if (!action) this.monsterPrepareTurn()

    if (card.type == action.type) { // ties
      action.power -= card.power
      action.animation = new Animation('drop-down', .2, 'linear', 0)
      if (action.power < 0) {
        this.damageCurrentMonster(Math.abs(action.power))
      }

    } else if (rpsOutcomes[card.type].includes(action.type)) { // player wins
      action.power -= card.power
      monster.health -= card.power

    } else { // player loses
      gameService.damagePlayer(1)
      action.animation = new Animation('bounce', .2, 'linear', 0)
      action.power = Math.ceil(action.power / 2)
      if (!monster.actions.length) {
        monster.actions.shift()
        monster.actions.push(action)
      }

    }
    if (action.power <= 0) {
      action.power = 0
      action.animation = new Animation('bounce', .2, 'linear', 0, () => {
        monster.removeCurrentAction()
        if (monster?.actions.length == 0) {
          if (monster.isAlive) gameService.activateCombo()
        }
      })
    }

  }

  damageCurrentMonster(damage) {
    const monster = AppState.currentMonster
    monster.health -= damage
    if (monster.health <= 0) monster.health = 0
    return monster.health
  }


  monsterDied() {
    AppState.currentMonster = null
    setTimeout(() => this.spawnNextMonster(), 100)
  }

}

export const monstersService = new MonstersService()
