<script setup>
import { computed, ref, watch } from 'vue';


const props = defineProps({
  currentHealth: Number,
  maxHealth: Number,
  block : {type: Number, default: 50},
  color: {type: String, default: 'danger'},
  direction: {type: String, default: 'left'}
})

const healthPercent = computed(()=> Math.round((props.currentHealth/props.maxHealth)*100))
const delayPercent = ref(100)

watch(healthPercent, ()=>{
  setTimeout(()=> delayPercent.value = healthPercent.value, 700)
})

</script>


<template>
<section class="health-container my-1">
  <div class="bar text-dark" :class="`bg-light ${direction}`" :style="{width: `${delayPercent}%`}"> </div>
  <div class="bar text-dark" :class="`bg-${color} ${direction}`" :style="{width:`${healthPercent > 100 ? 100 : healthPercent}%`}">
  </div>
  <div :class="`health-number  ${direction}`" :style="{'max-width':`${healthPercent > 100 ? 100 : healthPercent}%`}">
    {{ currentHealth || 0 }}
  </div>

</section>
</template>


<style lang="scss" scoped>
.health-container{
  width: 100%;
  height: 25px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--bs-light);
  backdrop-filter: blur(10px);
  .bar{
    display: flex;
    align-items: center;
    justify-content: end;
    height: 100%;
    position: absolute;
    top: 0;
    transition: width .2s ease;
  }
  .left{
    left: 0;
    justify-content: end;
    text-align: right;
  }
  .right{
    right: 0;
    justify-content: start;
    text-align: left
  }

  .health-number{
    min-width: 4ch;
    padding-inline: .5ch;
    color: var(--bs-light);
    mix-blend-mode: difference;
    filter: contrast(0.25);
  }
}
</style>
