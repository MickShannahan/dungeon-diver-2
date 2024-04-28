<script setup>
import { computed, ref, watch } from 'vue';
import { Action } from '../models/Action.js';
import { animate } from '../utils/animate.js';
import { logger } from '../utils/Logger.js';

const props =defineProps({action: Action, index: {type: Number, default: 0}})
const animation = computed(()=> props.action.animation)
const iconRef = ref(null)

watch(animation, async(anime, old)=>{
  logger.log('animation start', anime)
  if(anime) await anime.play(iconRef.value)
  logger.log('animation done', anime)
})
</script>


<template>
  <div ref="iconRef" class="action-icon" :title="action.description" :class="{smaller: index !=0 && !action.triggered}">
    <img :src="action.picture" alt="">
    <div :class="{'text-warning': index == 0}" class="rounded-circle">{{ action.power }}</div>
  </div>
</template>


<style lang="scss" scoped>
  .action-icon{
    height: 50px;
    margin-inline: 5px;
    aspect-ratio: 1/1;
    text-align: center;
    div{
      margin-inline: auto;
      height: 1.5em;
      aspect-ratio: 1/1;
    }
    img{
      width: 100%;
      aspect-ratio: 1/1;
      object-fit: contain;
      object-position: center;
    }
    &.smaller{
      height: 35px;
      opacity: .75;
    }
    &.triggered{
      animation: shoot-left .2s ease forwards;
    }
  }
</style>
