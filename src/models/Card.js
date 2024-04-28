import Cat from 'catid'
import { createId } from '../utils/GenerateId.js'
import { Action } from './Action.js'



export class Card {
  /**
   * @param {{
   * name: string,
   * flavor?: string,
   * picture?: string,
   * power: number,
   * type: ('rock'| 'paper'| 'scissors'| 'other'),
   * cost: number,
   * actions?: Action[],
   * rarity?: string,
   * level?: number,
   * background? : string
   * }} data
   */
  constructor({ name, flavor, picture, power, type, cost, actions, rarity = 'common', level = 1, background }) {
    this.id = createId(Cat.getName())
    this.name = name.toLowerCase()
    this.picture = picture || 'https://em-content.zobj.net/source/apple/391/moai_1f5ff.png'
    this.background = background || 'https://i.pinimg.com/originals/cb/7d/56/cb7d56ea8c80c84c78cde7588ec2ee73.png'
    this.flavor = flavor || ''
    this.power = power
    this.type = type || 'other'
    this.cost = cost
    this.actions = actions ? actions : []
    this.rarity = rarity
    this.level = level
  }

  get description() {
    const out = []
    this.actions.forEach(a => out.push(a.tooltip))
    return out.join('. ')
  }
}
