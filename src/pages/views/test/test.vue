<template>
  <button @click="increment">
    {{ obj.a.count }}
  </button>
  <button style="background-color: #99f" @click="state.count++">{{ state.count }}</button>
  <button style="background-color: #f99" @click="_user.age++">{{ _user.age }}</button>
  <div class="div-box">
    <p :class="{ active: isActive }">Has published books:</p>
    <span>{{ author.books.length > 0 ? 'yes' : 'no' }}</span>
  </div>
  <br />
  <span> {{ publishedBooksMessage }}</span>
  <div>{{ fullName }}</div>
  <!-- class 透传 -->
  <childCompontent class="transfer-child" />
  <br />
  <!-- slot -->
  <!-- 具名插槽 -->
  <!-- <slot-component>
    <template #header>
      <span>传递的内容</span>
    </template>
    <template #content>
      <el-tag type="success">{{ slotData }}</el-tag>
    </template>
  </slot-component> -->
  <br />
  <!-- 默认作用域插槽 -->
  <!-- <slot-component v-slot="slotProps"> {{ slotProps.text }} {{ slotProps.count }} </slot-component> -->
  <br />
  <!-- 具名作用域插槽 -->
  <slot-component>
    <template #header="headerProps">
      {{ headerProps }}
    </template>
    <template #content="contentProps">
      {{ contentProps }}
    </template>
  </slot-component>
  <!-- 异步组件 -->
  <AsyncComponent />
  <!-- 组合式函数 -->
  <div>Mouse position is at: {{ x }}, {{ y }}</div>

  <!-- 自定义指令 -->
  <div v-color="color">111</div>
  <div v-demo="{ color: '#f99', text: 'hello' }"></div>

  <!-- 插件 -->
  <h3>{{ $t('greetings.hello') }}</h3>
  <div>{{ i18n.greetings.hello }}</div>

  <!-- 内置组件 Transition -->
  <button @click="show = !show">Toggle</button>
  <Transition>
    <p v-if="show">Transition</p>
  </Transition>
  <span style="margin-right: 20px">Click to cycle through states:</span>
  <div class="btn-container">
    <Transition name="slide-up">
      <button v-if="docState === 'saved'" @click="docState = 'edited'">Edit</button>
      <button v-else-if="docState === 'edited'" @click="docState = 'editing'">Save</button>
      <button v-else-if="docState === 'editing'" @click="docState = 'saved'">Cancel</button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  proxyRefs,
  onMounted,
  computed,
  provide,
  readonly,
  defineAsyncComponent,
  onUnmounted,
  inject,
} from 'vue'
import childCompontent from '@/pages/views/test/childComponent.vue'
import slotComponent from '@/pages/views/test/slotComponent.vue'
import LoadingComponent from '@/components/loadingComponent.vue'
import ErrorComponent from '@/components/errorComponent.vue'
import { useMouse } from '@/components/mouse.js'

const count = ref(0)

const user = {
  age: ref(18),
  name: '2',
}
const _user = proxyRefs(user)

const obj = ref({
  a: { count: 10 },
  b: [1, 2, 3],
})
const state = reactive({ count: 100 })
const raw = {}
const proxy = reactive(raw)
console.log(proxy === raw, 'boolean')
console.log(reactive(raw) === proxy, 'boolean') // 对同一个原始对象调用 reactive 总是会返回同样的代理对象
console.log(reactive(proxy) === proxy, 'boolean') // 对一个已经存在的代理对象调用 reactive 会返回其本身

function increment() {
  count.value++
  obj.value.a.count++
}

// computed 相关

const author = reactive({
  name: 'yuan',
  books: ['vue 1', 'vue 2', 'vue 3'],
})

const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'yes' : 'no'
})

const firstName = ref('yuan')
const lastName = ref('coma')

const fullName = computed({
  get() {
    console.log('get computed')

    return firstName.value + ' ' + lastName.value
  },
  set(newvalue) {
    ;[firstName.value, lastName.value] = newvalue.split(' ')
    console.log('set computed')
  },
})

fullName.value = 'qi tina'

// style 与 class
const isActive = ref(true)

// slot
const slotData = ref(0)

// 依赖注入 provide && inject
const provideText = ref('注入的内容')
const provideReadonlyCount = ref(0)

provide('provideMessage', { provideText, handleChangeProvideMessage, provideReadonlyCount })
provide('read-only-count', readonly(provideReadonlyCount))

function handleChangeProvideMessage() {
  provideText.value = '修改后的注入的内容'
}

// 异步组件
// const AsyncComponent = defineAsyncComponent(() =>
//   import('@/components/defineAsyncComponent.vue')
// )

// 加载与错误状态(异步组件)
const AsyncComponent = defineAsyncComponent({
  loader: () => import('@/components/defineAsyncComponent.vue'),

  //加载异步组件时使用的组件
  loadingComponent: LoadingComponent,

  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,

  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是 Infinity
  timeout: 3000,
})

// 组合式函数

// step 1
// const x = ref(0);
// const y = ref(0)

// function updata(event) {
//   x.value = event.pageX
//   y.value = event.pageY
// }

// step 2
const { x, y } = useMouse()

// 自定义指令 在main.ts 中定义
const color = ref('#99f')

// 插件 在 main.ts 中定义
const i18n = inject('i18n')

// 内置组件使用
const show = ref(true)
const docState = ref('saved')

// onMounted
onMounted(() => {
  console.log(count.value, 'onMounted - count')
  console.log(user.age.value, 'onMounted - user - age')
  console.log(_user.age, 'onMounted - _user - age')
  console.log(publishedBooksMessage.value, 'onMounted - publishedBooksMessage')
})
</script>

<style lang="scss">
.div-box {
  width: 100%;
  background-color: #99f;
  .active {
    color: #9f9;
  }
}
.transfer-child {
  color: #9f9 !important;
}

// Transition

/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.btn-container {
  display: inline-block;
  position: relative;
  height: 1em;
}

button {
  position: absolute;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
