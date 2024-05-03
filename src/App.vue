<script setup>
import { computed, onMounted, ref } from 'vue';
import { gameService } from './services/GameService.js';
import { logger } from './utils/Logger.js';
import Navbar from './components/Navbar.vue'
import { AppState } from './AppState.js';
import { Settings } from './models/Settings.js';

const settings = computed(()=> AppState.gameSave?.settings || new Settings())


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
      <Navbar/>
    </header>
    <RouterView/>
    <!-- <CardInHand/> -->
    <footer class="bg-dark text-light">
    </footer>
    <div v-if="settings.scanLines" class="scan-lines"></div>
    <div v-if="settings.screenGlow" class="screen-glow"></div>
    <audio id="sound-effect" src=""></audio>
    <audio id="bg-music" src=""></audio>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";


:root{
  --card-height: min(27ch, 25vw);
  --card-width: min(20ch, 11vw);
}

.scan-lines{
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: .15;
  pointer-events: none;
  background-image: url(./assets/img/bgs/lines.png);
  z-index: 10000;
}
.screen-glow{
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: .28;
  pointer-events: none;
  backdrop-filter: blur(7px) brightness(1.2);
  z-index: 9999;
}
</style>
