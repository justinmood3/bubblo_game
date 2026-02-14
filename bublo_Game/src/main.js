// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'   // <-- Import your global CSS here

createApp(App)
  .use(router)
  .mount('#app')
