<script setup>
import { computed, ref, watch } from 'vue';
import { AppState } from '../AppState.js';
import HealthBar from './HealthBar.vue';
import { animate } from '../utils/animate.js';
import { logger } from '../utils/Logger.js';
import { Card } from '../models/Card.js';
import { playSFX } from '../utils/soundController.js';
import hurt from '../assets/sounds/hurt.wav'
import flyAway from '../assets/sounds/flyaway.wav'
import heal from '../assets/sounds/heal.wav'
import { monstersService } from '../services/MonstersService.js';
import { gameService } from '../services/GameService.js';
import ActionIcon from './ActionIcon.vue';

const monster = computed(()=> AppState.currentMonster)
const monsterHealth = computed(()=> AppState.currentMonster?.health)
const preparedAttacks = computed(()=> AppState.currentMonster?.actions)
const monsterImage = ref(null)

watch(monsterHealth, (newHealth, oldHealth)=>{
  logger.log(oldHealth, newHealth)
  if(oldHealth > newHealth){
    animate(monsterImage.value, 'flash-shake', '.5s', 'linear')
    playSFX(hurt)
    if(newHealth <= 0)monsterDied()
  }
  if(oldHealth< newHealth){
    animate(monsterImage.value, 'grow', '.5s', 'cubic-bezier(0.175, 0.885, 0.32, 1.5)')
    playSFX(heal)
    if(newHealth > monster.value.maxHealth) AppState.currentMonster.health = AppState.currentMonster.maxHealth
  }
})

/**
 *
 * @param {*} event
 * @param { Card } card
 */
function carPlayed(event, card){
  logger.log(card)
  if(AppState.player.energy < card.cost) return
  gameService.playCard(card)
}

function monsterDied(){
  animate(monsterImage.value, 'dead', '.5s', 'linear')
  playSFX(flyAway)
  setTimeout(()=> monstersService.monsterDied(), 600)

}

</script>


<template>
<section class="grid reveal" v-if="monster">
    <div class="actions-bar">
      <ActionIcon v-for="(action, i) in preparedAttacks" :action="action" :index="i" :key="i"/>
    </div>
    <div class="character-img text-center" ref="monsterImage">
      <img v-drop="carPlayed" class="img-fluid" :style="{animation: 'bounce 1.2s ease-out infinite', transformOrigin: 'bottom'}" :src="monster.picture" >
    </div>
    <div>
      <div class="fs-4 text-end f-jacquard-i">{{ monster.name }}</div>
      <HealthBar :currentHealth="monster.health" :maxHealth="monster.maxHealth" :block="25" color="warning" :direction="'right'"/>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.grid{
  position: relative;
  padding: 2vw;
  display: grid;
  place-content: center;
  width: 100%;
  grid-template-rows: auto auto 25px;
  grid-template-columns: 1fr;
  place-content: center;
  opacity: 0;
}
.reveal{
  opacity: 1;
  transition: opacity .5s .5s ease;
}

.actions-bar{
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: -2em;
  align-items: end;
}

.character-img{
  animation: fade-up .8s cubic-bezier(0.175, 0.885, 0.32, 1.75) forwards;
}
</style>
