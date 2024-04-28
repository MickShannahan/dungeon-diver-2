import { animate } from "../utils/animate.js"



export class Animation {
  /**
   *
   * @param {string} name
   * @param {string | number} [duration]
   * @param {string} timing
   * @param {string | number} [delay]
   * @param {*} [onEnd]
   */
  constructor(name, duration = '.5s', timing = 'linear', delay = 0, onEnd) {
    this.name = name
    this.duration = typeof duration == 'string' ? duration : duration + 's'
    this.delay = typeof delay == 'string' ? delay : delay + 's'
    this.timing = timing
    this.onEnd = onEnd
  }

  get animate() {
    return [this.name, this.duration, this.delay, this.timing]
  }

  async play(elm) {
    return await animate(elm, this.name, this.duration, this.timing, this.delay, this.onEnd)
  }
}
