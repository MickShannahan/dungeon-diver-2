import { logger } from "../utils/Logger.js"
import { Animation } from "./Animation.js"


export class Action {
  /**
   * @param {{
   * action: string,
   * power?: number,
   * name: string,
   * type: ('rock'| 'paper'| 'scissors'| 'other')
   * picture?: string,
   * description?: string,
   * arguments?: [*],
   * animation?: Animation
   * }} data
   */
  constructor(data) {
    this.action = data.action
    this.type = data.type || 'other'
    this.power = data.power || 0
    this.name = data.name
    this.picture = data.picture || 'src/assets/img/actions/glove.png'
    this.description = data.description || `${this.name} for {{power}}`
    this.arguments = data.arguments || []
    this.triggered = false
    this.animation = data.animation
  }

  get tooltip() {
    let tip = this.description
    const reg = /(?<=\{\{)(\w+)(?=\}\})/g
    const replaces = this.description.match(reg)
    replaces.forEach(r => tip = tip.replace(new RegExp(`{{${r}}}`, 'g'), this[r]))
    return tip
  }
}
