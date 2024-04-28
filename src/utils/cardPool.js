import { Action } from "../models/Action.js"
import { Card } from "../models/Card.js"

export function starterDeck() {
  let cards = cardPool.slice(0, 3)
  let out = [...cards]
  cards.forEach(c =>
    out.unshift(new Card(c))
  )
  out.unshift(cardPool[3])
  return out
}

export const cardPool = [
  new Card({
    name: 'rock',
    picture: 'https://em-content.zobj.net/source/apple/391/moai_1f5ff.png',
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
  }),
  new Card({
    name: 'potion',
    picture: 'https://em-content.zobj.net/source/twitter/348/teacup-without-handle_1f375.png',
    cost: 2,
    power: 0,
    type: 'other',
    flavor: 'heal up',
    actions: [
      new Action({
        name: 'potion',
        power: 3,
        action: 'healPlayer',
        type: 'other',
        description: 'heal player by {{power}}'
      })
    ]
  })
]
