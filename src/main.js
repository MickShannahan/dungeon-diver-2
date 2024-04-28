import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { router } from './router'
import { logger } from './utils/Logger.js'
import { customPickup } from './utils/PickUpDirective.js'
import { AppState } from './AppState.js'

const root = createApp(App)
async function init() {
  root
    .use(router)
    .directive('pickup', {
      beforeUnmount: (el, binding) => {
        el.removeEventListener('mousedown', binding.dir.pickupElm)
        el.removeEventListener('mouseup', binding.dir.dropElm)
        el.remove()
      },
      mounted: customPickup,
      updated: customPickup
    })
    .directive('drop', {
      mounted: (el, binding) => {
        el.setAttribute('data-drop-zone', true)
        el.drop = () => {
          let data = AppState.dropStore
          if (binding.value) binding.value(event, data)
        }
      }
    })
    .mount('#app')

}
init()
