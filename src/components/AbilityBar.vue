<script setup>
import { computed, ref, watch } from 'vue';
import { AppState } from '../AppState.js';


const player = computed(()=> AppState.player)
const abilityPower = computed(()=> AppState.player?.abilityPower)
const abilityAnimation = computed(()=> AppState.player.abilityAnimation)
const abilityRef = ref(null)
watch(abilityAnimation, async(anime)=>{
  if(anime && abilityRef.value) await anime.play(abilityRef.value)
})
</script>


<template>
  <Transition name="fade">
    <div v-if="abilityPower" ref="abilityRef" class="bg-info px-3 py-1 rounded-pill">
      <i class="mdi mdi-fire fs-5"></i> {{ abilityPower }}
    </div>
  </Transition>
</template>


<style lang="scss" scoped>


.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.5);
}

.fade-enter-from{
  opacity: 0;
  transform: translateY(20px);
}
.fade-leave-to {
  opacity: 0;
}
</style>
