<script setup>
import { onMounted, ref } from 'vue';
import { loadState } from './utils/Store.js';
import { GameSave } from './models/GameSave.js';
import { AppState } from './AppState.js';
import { monstersService } from './services/MonstersService.js';
import { gameService } from './services/GameService.js';


onMounted(()=>{
  document.body.addEventListener('contextmenu', (e)=> e.preventDefault())
  document.body.addEventListener('dragstart', (e)=> e.preventDefault())

  gameService.startNewRun()
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
  --card-height: 27ch;
  --card-width: v-bind(cardWidth);
}
</style>
