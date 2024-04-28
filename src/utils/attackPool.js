import { Action } from '../models/Action.js'

const rock = new Action({
  name: 'rock smash',
  type: 'rock',
  action: 'hurtPlayer',
  power: 2,
  picture: 'https://em-content.zobj.net/source/huawei/375/rock_1faa8.png'
})
const paper = new Action({
  name: 'paper cut',
  type: 'paper',
  action: 'hurtPlayer',
  power: 2,
  picture: 'https://em-content.zobj.net/source/huawei/375/page-facing-up_1f4c4.png'
})
const scissors = new Action({
  name: 'scissors slash',
  type: 'scissors',
  action: 'hurtPlayer',
  power: 2,
  picture: 'https://em-content.zobj.net/source/twitter/348/scissors_2702-fe0f.png'
})

export const startingAttackPool = [rock, paper, scissors]
