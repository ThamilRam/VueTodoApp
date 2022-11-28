import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Dialog from 'primevue/dialog'
import App from './App.vue'
import router from './router'
import { createVuestic, createIconsConfig } from 'vuestic-ui'
import 'vuestic-ui/css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/main.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import Button from "primevue/button";
import axios from "axios";
import ToastService from 'primevue/toastservice';


const pinia = createPinia();
const app = createApp(App)

const aliases = []
const fonts = []
const primevue = PrimeVue;
axios.defaults.baseURL ="http://localhost:3000/";// "http://localhost:33376/";

app.use(router)
app.use(pinia);

app.use(ToastService);
app.use(PrimeVue)
app.component('Dialog', Dialog, 'Button', Button);
app.use(PrimeVue, {
    config: {
        icons: createIconsConfig({ aliases, fonts })
    }
})
app.use(createVuestic(), {
    config: {
        icons: createIconsConfig({ aliases, fonts })
    }
})

app.config.errorHandler = (error) => {
    console.log(error);
}
app.mount('#app')
