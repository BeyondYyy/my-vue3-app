import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入图标
import 'element-plus/dist/index.css' // 引入样式
import { log } from 'console'

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.use(ElementPlus)

app.mount('#app')

// 自定义指令
app.directive('color', (el, binding) => {
  console.log(binding, 'binding')
  el.style.color = binding.value
})

app.directive('demo', (el, binding) => {
  console.log(el, 'el')
  el.style.color = binding.value.color
  el.innerText = binding.value.text
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
