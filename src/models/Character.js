import { createId } from "../utils/GenerateId.js"




export class Character {
  /**
   *
   * @param {{
   * name: string,
   * health: number,
   * energy: number,
   * picture: string
   * }} characterData
   */
  constructor({ name, health, energy, picture, }) {
    this.id = createId(name)
    this.name = name
    this.picture = picture
    this.health = health
    this.maxHealth = health
    this.energy = energy
    this.maxEnergy = energy
  }
}
