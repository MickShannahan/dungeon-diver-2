import { startingAttackPool } from "../utils/attackPool.js";
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

}
