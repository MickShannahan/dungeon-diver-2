<script setup>
import { AppState } from '../AppState.js';
import { gameService } from '../services/GameService.js';
import { playSFX, SFX } from '../utils/soundController.js';
import Card from './Card.vue'


  defineProps({hand: {type: Array, default: AppState.hand}})

  function drawCard(){
    AppState.player.energy--
    gameService.addCardsToHand(1)
    playSFX(SFX.drawCard)
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
    <section class="w-100 row justify-content-between">
      <div class="col-3 d-flex btn-group">
        <button class="btn btn-outline-primary d-flex align-items-center justify-content-center">
          <div>{{ AppState.player?.deck.length }}</div>
          <div><i class="mdi mdi-cards-playing fs-4"></i></div>
        </button>
        <button @click="drawCard()" class="btn btn-outline-primary f-jacquard-i">Draw <i class="mdi mdi-cards-playing-diamond"></i><i class="mdi mdi-plus"></i></button>
      </div>
      <div class="col-3 d-flex btn-group">
        <button class="btn btn-outline-danger d-flex align-items-center justify-content-center">
          <div>{{ AppState.player?.discard.length }}</div>
          <div><i class="mdi mdi-cards-playing fs-4"></i></div>
        </button>
        <button @click="passTurn()" class="btn btn-outline-danger f-jacquard-i">pass <i class="mdi mdi-arrow-right-bottom"></i></button>
      </div>
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
