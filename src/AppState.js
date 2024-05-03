import { reactive } from 'vue'
import { Card } from './models/Card.js'
import { Player } from './models/Player.js'
import { Monster } from './models/Monster.js'
import { GameSave } from './models/GameSave.js'
import { Stage } from './models/Stage.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({

  dropStore: null,

  /** @type {GameSave} */
  gameSave: null,

  /** @type {Player} */
  player: new Player(
    {
      name: 'Slate Slabrock',
      health: 25,
      energy: 4,
      picture: 'src/assets/img/characters/AlbinoHerbert.png'
    }
  ),

  /** @type{ Card } */
  cardInHand: null,

  /** @type { Card[]} */
  hand: [
    new Card({
      name: 'rock',
      cost: 1,
      power: 4,
      type: 'rock',
      flavor: 'just a rock'
    }),
    new Card({
      name: 'paper',
      picture: 'https://em-content.zobj.net/source/samsung/395/page-facing-up_1f4c4.png',
      cost: 1,
      power: 4,
      type: 'paper',
      flavor: 'just a paper'
    }),
    new Card({
      name: 'scissors',
      picture: 'https://em-content.zobj.net/source/apple/391/scissors_2702-fe0f.png',
      cost: 1,
      power: 4,
      type: 'scissors',
      flavor: 'just a scissors'
    })
  ],

  /** @type  {Stage} */
  currentStage: null,

  /** @type {Monster[]} */
  monsters: [],

  /** @type {Monster} */
  currentMonster: null

})
