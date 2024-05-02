



export class Settings {
  constructor(data = {}) {
    this.animationSpeed = data.animationSpeed || 1
    this.delaySpeed = data.delaySpeed || 1
    this.scanLines = data.scanLines ? data.scanLines : true
    this.screenGlow = data.screenGlow ? data.screenGlow : true
    this.warpedScreen = data.warpedScreen ? data.warpedScreen : true
  }
}
