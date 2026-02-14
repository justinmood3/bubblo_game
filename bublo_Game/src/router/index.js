import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import Game from '../views/GameView.vue'
import NotFound from '../views/NotFoundView.vue'   // <-- Correct variable
import HudBar from '../components/HudBar.vue'
import { Bubble } from '../game/Bubble'
import GameView from '../views/GameView.vue'
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/game', name: 'Game', component: Game },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/bubbles', name: 'Bubbles', component: Bubble },
  { path: '/hudbar', name: 'HudBar', component: HudBar },
   { path: '/game', name: 'game',component: GameView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
