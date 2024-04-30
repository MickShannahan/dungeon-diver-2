import { Monster } from "../models/Monster.js";
import { pool2 } from "./attackPool.js";


export const monsterPool = [
  new Monster({
    name: 'Thok',
    picture: 'src/assets/img/characters/DogToy.png',
    health: 50,
    actionCount: 2
  }),
  new Monster({
    name: 'Razer',
    picture: 'src/assets/img/characters/Herbert.png',
    health: 12
  }),
  new Monster({
    name: 'Oslo',
    picture: 'src/assets/img/characters/Oslo.png',
    health: 15,
    actionCount: 2
  }),
  new Monster({
    name: 'Georgie',
    picture: 'src/assets/img/characters/Georgie 2.png',
    actionCount: 2,
    health: 18,
    actionPool: pool2
  }),
  new Monster({
    name: 'Kiwi',
    picture: 'src/assets/img/characters/KiwiPlush.png',
    actionCount: 2,
    health: 20,
    actionPool: pool2
  }),
  new Monster({
    name: 'Robert',
    picture: 'src/assets/img/characters/DuckHat.png',
    actionCount: 2,
    health: 22,
    actionPool: pool2
  }),
  new Monster({
    name: 'Snips',
    picture: 'https://em-content.zobj.net/source/twitter/348/crab_1f980.png',
    actionCount: 2,
    health: 25,
    actionPool: pool2
  })
]
