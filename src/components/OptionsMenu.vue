<script setup>
import {computed, ref, watch} from 'vue'
import {Settings} from '../models/Settings.js'
import {AppState} from '../AppState.js'
const settings = computed(()=> AppState.gameSave?.settings || new Settings())

const settingsData = ref(new Settings())
const needSave = computed(()=> {
  return !Object.keys(settings.value).every(key => settings.value[key] == settingsData.value[key])
})

  watch(settings, (newSettings)=>{
    settingsData.value = new Settings(newSettings)
    // save settings
  })

  function save(){
    AppState.gameSave.settings = settingsData.value
  }
</script>


<template>
<div class="container-fluid">
  <section class="row">

    <div v-for="(set, option) in settingsData" :key="`menu-${option}`" class="col-2 p3-0">
      <div v-if="typeof set == 'boolean'" class="form-check form-switch">
        <input v-model="settingsData[option]" class="form-check-input" type="checkbox" role="switch"
          id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">{{option}}</label>
      </div>
      <div v-else-if="typeof set == 'number'">
        <label :for="option" class="form-label">{{ option }}  <span class="text-info">{{ settingsData[option] }}</span></label>
        <input v-model.number="settingsData[option]" type="range" min=".2" max="2" step=".1" class="form-range" :id="option">
      </div>

    </div>
    <div class="col-12 text-end">

      <button @click="save()" :disabled="!needSave" class="btn btn-outline-info text-light">save</button>
    </div>
  </section>
</div>
</template>


<style lang="scss" scoped>

</style>
