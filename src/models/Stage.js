import { createId } from "../utils/GenerateId.js";
import { Monster } from "./Monster.js";


export class Stage {
  /**
   *
   * @param {{
   * name: string,
   * background: string,
   * music: string,
   * type: string,
   * monsters: Monster[],
   * effect: string,
   * level: number
   * }} param0
   */
  constructor({ name, background, music, type, monsters, effect, level }) {
    this.name = name
    this.id = createId(name)
    this.level = level
    this.background = background
    this.music = music
    this.type = type || 'battle'
    this.monsters = monsters
    this.effect = effect
  }
}
