import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入图标
import 'element-plus/dist/index.css' // 引入样式
import i18nPlugin from './plugins/i18n'

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.use(ElementPlus)

app.mount('#app')

// 自定义指令
app.directive('color', (el, binding) => {
  el.style.color = binding.value
})

app.directive('demo', (el, binding) => {
  el.style.color = binding.value.color
  el.innerText = binding.value.text
})

// 插件使用
app.use(i18nPlugin, {
  greetings: {
    hello: '你好!',
  },
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
