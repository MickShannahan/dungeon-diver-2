import { Action } from "../models/Action.js"
import { logger } from "../utils/Logger.js"
import { gameService } from "./GameService.js"




class CardActions {

  /**
   * @param {Action} payload
   */
  hurtPlayer(payload) {
    logger.log('hurtPlayer')
    gameService.damagePlayer(payload.power)
  }

  healPlayer(payload) {
    gameService.healPlayer(payload.power)
  }

  hurtMonster(payload) {
    logger.log('hurMonster')
  }

}


export const cardActions = new CardActions()
