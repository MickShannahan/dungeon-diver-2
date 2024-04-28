<script setup>
import { Action } from '../models/Action.js';

defineProps({action: Action, index: {type: Number, default: 0}})
</script>


<template>
  <div class="action-icon" :title="action.description" :class="{smaller: index !=0 && !action.triggered, triggered: action.triggered}">
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
