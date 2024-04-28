<script setup>
import { AppState } from '../AppState.js';
import { gameService } from '../services/GameService.js';
import Card from './Card.vue'


  defineProps({hand: {type: Array, default: AppState.hand}})

  function drawCard(){
    AppState.player.energy--
    gameService.addCardsToHand(1)
  }

  function passTurn(){
    gameService.passTurn()
  }
</script>


<template>
  <div class="grid">

    <section class="card-hand d-flex justify-content-center">

      <Card v-for="card in hand" :key="card.id" :card="card"/>

    </section>
    <section class="w-100 d-flex justify-content-between">
      <button @click="drawCard()" class="btn btn-outline-primary">Draw <i class="mdi mdi-cards-playing-diamond"></i><i class="mdi mdi-plus"></i></button>
      <button @click="passTurn()" class="btn btn-outline-danger">Pass <i class="mdi mdi-arrow-right-bottom"></i></button>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.grid{
  display: grid;
  grid-template-columns: auto;
  grid-template-rows:  auto auto;
  place-items: center;
}

.card-hand{
  min-height: var(--card-height);
}
</style>
