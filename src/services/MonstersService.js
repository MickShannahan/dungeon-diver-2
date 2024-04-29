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
    logger.log('spawnNextMonster')
    this.monsterPrepareTurn()
  }

  monsterPrepareTurn() {
    AppState.currentMonster.prepareActions()
  }

  monsterTakeTurn() {
    const monster = AppState.currentMonster
    if (!monster.isAlive) return
    let actions = AppState.currentMonster.actions
    actions.forEach((a, i) => {
      setTimeout(() => {
        cardActions[a.action](a)
        a.animation = new Animation('shoot-left', .3, 'ease', .1, () => {
          AppState.currentMonster.removeCurrentAction()
        })
      }, 400 * (i + 1))
    })
    setTimeout(() => {
      // gameService.addCardsToHand(3)
      gameService.restoreEnergy(AppState.player.maxEnergy)
      actions.length = 0
      logger.log('monsterTakeTurn')
      this.monsterPrepareTurn()
    }, (400 * actions.length) + 300)
  }

  async counterActions(card) {
    const monster = AppState.currentMonster
    const action = monster?.actions[0]
    const currentPower = AppState.player?.abilityPower
    logger.log('counterActions')
    if (!action) {
      this.monsterPrepareTurn()
    }

    if (card.type == action.type) { // ties
      action.power -= card.power
      action.animation = new Animation('drop-down', .2, 'linear', 0)
      if (action.power < 0) {
        this.damageCurrentMonster(Math.abs(action.power))
      }

    } else if (rpsOutcomes[card.type].includes(action.type)) { // player wins
      action.power -= card.power
      let dealt = monster.health - card.power > 0 ? card.power : Math.abs(card.power - monster.health - card.power)
      this.damageCurrentMonster(card.power)
      AppState.player.abilityPower += dealt

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
      action.animation = new Animation('bounce', .2, 'linear', 0, async () => {
        monster.removeAction(action)
        if (!monster.isAlive) return
        if (!monster.hasActions && AppState.player.abilityPower && currentPower) await gameService.activatePlayerAbility()
        else if (!monster.hasActions && AppState.player.energy > 0) this.monsterPrepareTurn()
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

    gameService.drawNewHand()
    setTimeout(() => {
      this.spawnNextMonster()
    }, 500)
  }

}

export const monstersService = new MonstersService()
