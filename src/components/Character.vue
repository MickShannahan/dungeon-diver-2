<script setup>
import { computed, ref, watch } from 'vue';
import { AppState } from '../AppState.js';
import HealthBar from './HealthBar.vue';
import EnergyBar from './EnergyBar.vue';
import { monstersService } from '../services/MonstersService.js';
import { logger } from '../utils/Logger.js';
import { animate } from '../utils/animate.js';
import { playSFX } from '../utils/soundController.js';
import hurt from '../assets/sounds/playerHurt.wav'
import heal from '../assets/sounds/heal.wav'
import { gameService } from '../services/GameService.js';


const player = computed(()=> AppState.player)
const playerImg = ref(null)
const energy = computed(()=> AppState.player?.energy)
const health = computed(()=> AppState.player?.health)

function damagePlayer(){
  AppState.player.health--
}

watch(energy, (newE, oldE)=>{
  if (newE <= 0) {
    logger.log('out of energy')
    monstersService.monsterTakeTurn()
  }
})

watch(health, (newHealth, oldHealth)=>{
  if(oldHealth > newHealth){
    animate(playerImg.value, 'flash-shake', '.5s .1', 'linear')
    playSFX(hurt)
  }
  if(oldHealth < newHealth){
    animate(playerImg.value, 'green-grow', '.5s .1', 'linear')
    playSFX(heal)
  }
})

function playCard(event, card){
  if(card.type == 'other')
  if(AppState.player.energy < card.cost) return
  gameService.playCard(card)
}

</script>


<template>
  <section class="grid">

    <div class="character-img text-center flipped">
      <img v-drop="playCard" ref="playerImg" class=" img-fluid" :src="player.picture" alt="" @click="damagePlayer">
    </div>

    <div class="w-100">
      <div class="fs-4">{{ player.name }}</div>
      <HealthBar :currentHealth="player.health" :maxHealth="player.maxHealth" :block="25" color="success"/>
    </div>

    <div>
      <EnergyBar :energy="player.energy" :maxEnergy="player.maxEnergy"/>
    </div>

  </section>
</template>


<style lang="scss" scoped>
.grid{
  padding: 4em;
  display: grid;
  place-content: center;
  width: 100%;
  grid-template-rows: auto auto 25px;
  grid-template-columns: 1fr;
  place-content: center;
}
</style>
