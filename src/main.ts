console.log(
    `%cCe site a été développé par Aristide Ghislain Adouko`,
    "color: red; font-size: 12px; font-family: monospace; font-weight: bold;"
  );
  

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

const app = createApp(App)

app.use(router)

app.use(store)

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

app.mount('#app')
