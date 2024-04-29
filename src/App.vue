<script setup>
import { onMounted, ref } from 'vue';
import { gameService } from './services/GameService.js';
import { logger } from './utils/Logger.js';


onMounted(()=>{
  try {
    document.body.addEventListener('contextmenu', (e)=> e.preventDefault())
    document.body.addEventListener('dragstart', (e)=> e.preventDefault())

    gameService.startNewRun()
  } catch (error) {
    logger.error(error)
  }
})

const cardHeight= ref('27ch')
const cardWidth= ref('20ch')

</script>

<template>
    <header>
    </header>
    <RouterView/>
    <!-- <CardInHand/> -->
    <footer class="bg-dark text-light">
    </footer>

    <audio id="sound-effect" src=""></audio>
    <audio id="bg-music" src=""></audio>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";


:root{
  --card-height: min(27ch, 25vw);
  --card-width: min(20ch, 11vw);
}
</style>
