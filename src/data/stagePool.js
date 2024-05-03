import { Stage } from "../models/Stage.js";
import { monsterPool } from "./monsterPool.js";

export const stage1 = new Stage({
  name: 'starting',
  background: '/assets/img/bgs/ships.jpg',
  type: 'battle',
  monsters: monsterPool.slice(0, 3),
  effect: 'none',
  music: 'none'
})
