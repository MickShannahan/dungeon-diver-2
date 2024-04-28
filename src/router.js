import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Start',
    component: loadPage('StartPage')
  },
  {
    path: '/map',
    name: 'Map',
    component: loadPage('MapPage')
  },
  {
    path: '/battle',
    name: 'Battle',
    component: loadPage('BattlePage')
  },
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
