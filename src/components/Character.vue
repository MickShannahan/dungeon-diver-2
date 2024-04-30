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
import AbilityBar from './AbilityBar.vue';


const player = computed(()=> AppState.player)
const playerImg = ref(null)
const energy = computed(()=> AppState.player?.energy)
const health = computed(()=> AppState.player?.health)
const activeDropZone =computed(()=>{
  if(AppState.currentMonster?.actions[0]) return true
  return false
})

function damagePlayer(){
  AppState.player.health--
}

// watch(energy, (newE, oldE)=>{
//   if (newE <= 0) {
//     logger.log('out of energy')
//     // monstersService.monsterTakeTurn()
//   }
// })

watch(health, (newHealth, oldHealth)=>{
  if(oldHealth > newHealth){
    animate(playerImg.value, 'flash-shake', '.5s' , 'linear', '.1s')
    playSFX(hurt)
  }
  if(oldHealth < newHealth){
    animate(playerImg.value, 'green-grow', '.5s', 'linear', '.1s')
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

    <section class="ability-bar">
      <AbilityBar/>
    </section>

    <div class="character-img text-center flipped">
      <div class="marching">
        <img v-drop="playCard" ref="playerImg" class=" img-fluid" :src="player.picture" :data-drop-zone="activeDropZone">
      </div>
    </div>

    <div class="w-100">
      <HealthBar :currentHealth="player.health" :maxHealth="player.maxHealth" :block="25" color="success"/>
    </div>

    <div>
      <div class="fs-4 f-jacquard-i">{{ player.name }}</div>
      <!-- <EnergyBar :energy="player.energy" :maxEnergy="player.maxEnergy"/> -->
    </div>

  </section>
</template>


<style lang="scss" scoped>
.grid{
  padding: 2vw;
  position: relative;
  display: grid;
  place-content: center;
  width: 100%;
  grid-template-rows: auto auto 25px;
  grid-template-columns: 1fr;
  place-content: center;
}

.ability-bar{
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: -2em;
  align-items: end;
}

.marching{
  --march-height: -5%;
  animation: march 1s ease infinite;
}
</style>
