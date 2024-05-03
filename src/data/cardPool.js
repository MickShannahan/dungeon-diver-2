import { Action } from "../models/Action.js"
import { Card } from "../models/Card.js"

export function starterDeck() {
  let cards = cardPool.slice(0, 3)
  let out = [...cards]
  cards.forEach(c =>
    out.unshift(new Card(c))
  )
  cards.forEach(c =>
    out.unshift(new Card(c))
  )
  out.unshift(new Card(cardPool[3]))
  out.unshift(new Card(cardPool[3]))
  out.unshift(new Card(cardPool[4]))
  return out
}

export const cardPool = [
  new Card({
    name: 'rock',
    picture: 'https://em-content.zobj.net/source/apple/391/rock_1faa8.png',
    cost: 1,
    power: 4,
    type: 'rock',
    flavor: 'just a rock'
  }),
  new Card({
    name: 'paper',
    picture: 'https://em-content.zobj.net/source/facebook/355/page-facing-up_1f4c4.png',
    cost: 1,
    power: 4,
    type: 'paper',
    flavor: 'just a paper'
  }),
  new Card({
    name: 'scissors',
    picture: 'https://em-content.zobj.net/source/twitter/348/scissors_2702-fe0f.png',
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
  }),
  new Card({
    name: 'draw 2',
    picture: 'https://em-content.zobj.net/source/twitter/348/flower-playing-cards_1f3b4.png',
    power: 0,
    cost: 1,
    type: 'other',
    flavor: "don't mind if I do",
    actions: [
      new Action({
        name: 'draw',
        power: 3,
        action: 'deckToHand',
        type: 'other',
        description: 'draw {{power}} cards'
      })
    ]
  })
]
