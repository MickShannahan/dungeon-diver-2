<script setup>
import { computed, ref, watch } from 'vue';
import { AppState } from '../AppState.js';
import { gameService } from '../services/GameService.js';
import { playSFX, SFX } from '../utils/soundController.js';
import Card from './Card.vue'
import { logger } from '../utils/Logger.js';
import EnergyBar from './EnergyBar.vue';

  // defineProps({hand: {type: Array, default: AppState.hand}})
  const hand = computed(()=> AppState.player?.hand)
  const cardInHand = computed(()=> AppState.cardInHand)
  const handLength = computed(()=> AppState.player?.hand.length)
  const deck = computed(()=> AppState.player?.deck)
  const deckHasCards = computed(()=> !!AppState.player.deck.length)
  const overDiscard = ref(false)

  watch(handLength, (newl, oldl)=>{
    if(newl > oldl) playSFX(SFX.drawCard)
  })

  function drawCard(){
    AppState.player.energy--
    gameService.addCardsToHand(1)
  }

  function passTurn(){
    gameService.passTurn()
  }

  /**
   * @param {*} event
   * @param {Card} card
   */
  function discardCard(event, card){
    logger.log('discarding', card)
    gameService.discardCard(card)
  }
</script>


<template>
  <div class="grid">

    <section class="card-hand d-flex justify-content-center">
      <TransitionGroup name="cards">
        <div v-for="card in hand" :key="card.id">
          <Card :card="card"/>
        </div>
      </TransitionGroup>

    </section>
    <section class="w-100 row justify-content-between">
      <div class="col-5 col-md-4 col-lg-3 d-flex btn-group">
        <button class="btn btn-outline-primary d-flex align-items-center justify-content-center deck-count h-100">
          <div v-if="deckHasCards" >
            <Transition v-for="num in deck.length" :key="num" name="deck-count">
              <div  v-if="deck.length == num">{{ num }}</div>
            </Transition>
          </div>
          <div v-else class="text-danger">0</div>
          <div><i class="mdi mdi-cards-playing fs-4"></i></div>
        </button>
        <button :disabled="!deckHasCards" @click="drawCard()" class="btn btn-outline-primary f-jacquard-i">Draw <i class="mdi mdi-cards-playing-diamond"></i><i class="mdi mdi-plus"></i></button>
      </div>

      <div class="col" v-if="AppState.player" >
        <EnergyBar :energy="AppState.player.energy" :maxEnergy="AppState.player.maxEnergy" :restoring="overDiscard && cardInHand ? 1: 0"/>
      </div>
      <div class="col-5 col-md-4 col-lg-3 d-flex btn-group">
        <button v-drop="discardCard" class="btn btn-outline-danger d-flex align-items-center justify-content-center" @mouseenter="overDiscard = true" @mouseleave="overDiscard = false">
          <div>{{ AppState.player?.discard.length }}</div>
          <div><i class="mdi mdi-grave-stone fs-4"></i></div>
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

.deck-count{
  overflow: visible;
}

.cards-move,
.cards-enter-active,
.cards-leave-active {
  transition: all .2s ease;
}
.cards-leave-active{
  position: absolute;
}

.cards-leave-to,
.cards-enter-from{
  opacity: 0;
  transform: translateY(50px) rotateY(90deg) scaleX(0);
}
// .cards-leave-to {
//   transform: translateY(-50px);
// }

.deck-count-enter-active{
  transition: all .2s linear;
  height: 4px;
}
.deck-count-leave-active {
  transition: all .2s linear;
  height: 4px;
}
.deck-count-enter-from {
  opacity: .5;
  color: var(--bs-danger);
  transform: translateY(-10px);
}
.deck-count-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

