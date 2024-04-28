import { rpsOutcomes } from "../services/MonstersService.js";
import { startingAttackPool } from "../utils/attackPool.js";
import { logger } from "../utils/Logger.js";
import { randomArr } from "../utils/Random.js";
import { Action } from "./Action.js";
import { Character } from "./Character.js";


/**
 *
 * @param {{
* name: string,
* health: number,
* energy: number,
* picture: string
* }} characterData
*/
export class Monster extends Character {
  constructor(data) {
    super(data)
    this.actionType = data.actionType || 'random'
    this.actionCount = data.actionCount || 1
    this.actionPool = data.actionPool || startingAttackPool
    this.actions = data.actions || []

  }

  calcDamage(attack) {
    const currentAction = this.actions[0]
    if (!currentAction) return 'no action'
    if (attack.type == currentAction.type) {
      return currentAction.power - attack.power
    }
    if (rpsOutcomes[attack.type].includes(currentAction.type)) {
      return attack.power
    }
    return 0
  }


  addAction() {
    switch (this.actionType) {
      case 'random':
        this.actions.unshift(new Action(randomArr(this.actionPool)))
        break;
      default:
        let a = this.actionPool.shift()
        this.actions.push(a)
        this.actionPool.push(new Action(a))
    }
  }

  removeCurrentAction() {
    let act = this.actions.shift()
  }

  prepareActions() {
    logger.log('prepare Actions')
    this.actions = []
    let count = this.actionCount
    while (count--) {
      setTimeout(() => {
        this.addAction()
      }, 350 * this.actionCount - count)
    } (count)
  }

  get isAlive() {
    return this.health > 0
  }
}
