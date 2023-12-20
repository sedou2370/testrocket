import {createApp} from 'vue'
// @ts-ignore
import Antd from 'ant-design-vue';
// @ts-ignore
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(Antd)
app.mount('#app')
