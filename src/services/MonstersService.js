import { AppState } from "../AppState.js"
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
    AppState.currentMonster.actions = []
    let actions = AppState.currentMonster.actionCount
    while (actions--) {
      AppState.currentMonster.addAction()
    } (actions)
  }

  monsterTakeTurn() {
    let actions = AppState.currentMonster.actions
    actions.forEach((a, i) => {
      setTimeout(() => {
        a.triggered = true
        cardActions[a.action](a)
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
    const action = AppState.currentMonster?.actions[0]
    if (!action) this.monsterPrepareTurn()

    if (card.type == action.type) {
      action.power -= card.power
      if (action.power < 0) this.damageCurrentMonster(Math.abs(action.power))
    } else if (rpsOutcomes[card.type].includes(action.type)) {
      action.power -= card.power
      AppState.currentMonster.health -= card.power
    } else {
      gameService.damagePlayer(1)
      AppState.currentMonster.actions.shift()
      AppState.currentMonster.actions.push(action)
    }
    if (action.power <= 0) AppState.currentMonster.actions.shift()

    if (AppState.currentMonster?.actions.length == 0) gameService.activateCombo()
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
