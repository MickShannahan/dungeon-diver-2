<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const props = defineProps({energy: Number, maxEnergy: Number, spending: {type: Number, default: 0}})
const cardInHand = computed(()=> AppState.cardInHand)
const energyCost = computed(()=> {
  if(AppState.cardInHand) return AppState.cardInHand.cost
  return 0
})

</script>


<template>
<section class="h-100 w-100 d-flex flex-wrap">
  <div v-for="(e, i) in maxEnergy" :key="i" class="energy-bulb" :class="{filled: e <= energy, glow: energyCost >= e}"><i class="mdi mdi-lightning-bolt"></i></div>
</section>
<!-- <div>e{{ energy }}| me{{ maxEnergy }} | ec{{ energyCost }}</div> -->
</template>


<style lang="scss" scoped>
  .energy-bulb{
    height: 100%;
    width: 5%;
    min-width: 40px;
    margin-right: 1%;
    border-radius: 25em;
    border: 1px solid var(--bs-light);
    background-color: transparent;
    transition: all .1s linear;
    text-align: center;
  }
  .filled{
    background-color: var(--bs-primary);
  }
  .glow:not(.filled){
    border-color: var(--bs-danger);
    box-shadow: inset 0px 0px 4px var(--bs-danger);
    color: var(--bs-danger);
  }
  .filled.glow{
    background-color: var(--bs-warning);
  }
</style>
