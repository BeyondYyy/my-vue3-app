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
  <!-- <slot-component>
    <template #header="headerProps">
      {{ headerProps }}
    </template>
    <template #content="contentProps">
      {{ contentProps }}
    </template>
  </slot-component> -->
</template>

<script setup>
import { ref, reactive, proxyRefs, onMounted, computed, provide, readonly } from 'vue'
import childCompontent from '@/pages/views/test/childComponent.vue'
import slotComponent from '@/pages/views/test/slotComponent.vue'

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
</style>
