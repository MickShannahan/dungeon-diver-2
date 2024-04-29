<script setup>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { Card } from '../models/Card.js';
import { logger } from '../utils/Logger.js';
import { animate } from '../utils/animate.js';
import { playSFX } from '../utils/soundController.js';
import fail from '../assets/sounds/fail.wav'


const {card: cardProp} = defineProps({card: Card})
const currentMonsterAction = computed(()=> AppState.currentMonster?.actions[0])
const currentDamage = computed(()=>{
  return AppState.currentMonster?.calcDamage(cardProp)
})
const image = ref(null)
const cardRef = ref(null)
const holding = ref(false)

function pickup(e){
  // logger.log('⬆️', cardProp.name)
  holding.value = true
  AppState.cardInHand = cardProp
}

function drop(e){
  // logger.log('⬇️', cardProp.name)
  holding.value = false
  AppState.cardInHand = null
if(AppState.player.energy < cardProp.cost) return failToPlay()
}

function playCard(){
  // gameService.playCard(cardProp)
}

function failToPlay(){
  animate(cardRef.value, 'shakeX', '.5s', 'linear')
  playSFX(fail)
}
</script>


<template>
   <div ref="image" class="preview-img text-center">
      <img :src="card.picture" :alt="`image of ${card.name}`">
      <div v-if="currentDamage != '' && card.type != 'other'">
        <i class="mdi mdi-sword"></i>{{ Math.abs(currentDamage) }}
      </div>
      <div v-else>
        <small>{{card.description}}</small>
      </div>
    </div>

    <div class="rps-card" ref="cardRef" :class="{active: holding}"
      v-pickup="{pickup, drop, dragElm: image, data: card}">
      <div class="img-background" :style="`--bg: url(${card.background})`">
        <img :src="card.picture" :alt="`image of ${card.name}`">
      </div>
      <div class="power-cost-bar">
        <kbd class="bg-danger text-light rounded-pill"><i class="mdi mdi-sword"></i>{{ card.power || 0 }}</kbd><kbd
          class="bg-primary text-light" :class="{'border border-danger': card.cost > AppState.player.energy}"><i
            class="mdi mdi-lightning-bolt"></i>{{ card.cost }}</kbd>
      </div>
      <div class="card-body text-center">
        <div class="tiny-font">{{ card.flavor }}</div>
        <hr class="my-1">
        <p class="tiny-font my-1 text-info">{{ card.description }}</p>
      </div>
    </div>



</template>


<style lang="scss" scoped>
  $card-radius: 10px;
  $card-padding: 6px;

  .rps-card{
    position: relative;
    font-size: 13px;
    height: var(--card-height);
    aspect-ratio: 3/4;
    background-color: rgba(190, 190, 190, 0.5);
    backdrop-filter: blur(20px);
    border-radius:$card-radius;
    outline: 3px double var(--bs-light);
    outline-offset: -4px;
    margin-inline: max(-5px, -4vw);
    padding: $card-padding;
    transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.75);
    cursor: grab;
    &:hover, &.active{
      z-index: 10;
      margin-inline: 4px;
      transform: translateY(-25px) scale(1.2);
      box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.5);
    }
    &.active{
      filter: drop-shadow(0px 0px 2px var(--bs-light));
    }
    &:active{
      cursor: grabbing;
    }

    .img-background{
      text-align: center;
      padding: 4px;
      height: 45%;
      border-radius: calc($card-radius - $card-padding);
      margin: auto;
      background-image: var(--bg);
      background-position: center;
      background-size: cover;
      img{
        height: 100%;
        object-fit: contain;
        object-position: center;
        background-image: none;
        filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.4));
      }
    }

    .power-cost-bar{
      padding: 0px 5px;
      margin-top: -10px;
      display: flex;
      justify-content: space-between;
    }


    *{
      pointer-events: none;
    }
  }

  .preview-img{
    position: fixed;
    --march-height: 5px;
    // opacity: 0;
    img{
      height: 50px;
      width: 50px;
      object-fit: contain;
    }
  }


</style>
