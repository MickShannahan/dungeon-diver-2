<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Card from '../components/Card.vue';
import { logger } from '../utils/Logger.js';
import CardHand from '../components/CardHand.vue';
import Character from '../components/Character.vue';
import Monster from '../components/Monster.vue';
import { gameService } from '../services/GameService.js';


const hand = computed(()=> AppState.player?.hand || [])
function dropped(event, payload){
  logger.log('📧', payload)
}

onMounted(()=>{
  AppState.player.shuffleDeck()
  gameService.drawNewHand()
})
</script>


<template>
  <main >
    <div class="container-md">
      <section class="row justify-content-center">
        <div class="col-6 col-lg-5 px-3 px-lg-5 py-3">
          <Character/>
        </div>
        <div class="col-6 col-lg-5 px-3 px-lg-5 py-3">
          <Monster/>
        </div>
      </section>
      <CardHand :hand="hand"/>
    </div>
  </main>
</template>


<style lang="scss" scoped>
main{
  overflow: hidden;
  padding: 25px 0px;
  align-items: end;
  background-image: url('src/assets/img/bgs/cave.jpg');
  background-position: 100% 400%;
  background-repeat: no-repeat;
}
</style>
