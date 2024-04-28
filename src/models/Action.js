import { logger } from "../utils/Logger.js"


export class Action {
  /**
   * @param {{
   * action: string,
   * power?: number,
   * name: string,
   * type: ('rock'| 'paper'| 'scissors'| 'other')
   * picture?: string,
   * description?: string,
   * arguments?: [*]
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
    logger.log(this)
  }

  get tooltip() {
    let tip = this.description
    const reg = /(?<=\{\{)(\w+)(?=\}\})/g
    const replaces = this.description.match(reg)
    logger.log('replacing', replaces, this.description)
    replaces.forEach(r => tip = tip.replace(new RegExp(`{{${r}}}`, 'g'), this[r]))
    return tip
  }
}
