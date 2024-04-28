import { Monster } from "../models/Monster.js";


export const monsterPool = [
  new Monster({
    name: 'Thok',
    picture: 'src/assets/img/characters/DogToy.png',
    health: 10
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
    health: 18
  }),
  new Monster({
    name: 'Kiwi',
    picture: 'src/assets/img/characters/KiwiPlush.png',
    health: 20
  }),
  new Monster({
    name: 'Robert',
    picture: 'src/assets/img/characters/DuckHat.png',
    health: 22
  }),
  new Monster({
    name: 'Snips',
    picture: 'https://em-content.zobj.net/source/twitter/348/crab_1f980.png',
    health: 25
  })
]
