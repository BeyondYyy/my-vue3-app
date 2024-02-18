<template>
  <button @click="increment">
    {{ obj.a.count }}
  </button>
  <button style="background-color: #99f" @click="state.count++">{{ state.count }}</button>
  <button style="background-color: #f99" @click="_user.age++">{{ _user.age }}</button>
</template>
<script setup lang="ts">
import { ref, reactive, proxyRefs, onMounted } from 'vue'

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

onMounted(() => {
  console.log(count.value, 'onMounted - count')
  console.log(user.age.value, 'onMounted - user - age')
  console.log(_user.age, 'onMounted - _user - age')
})
</script>
