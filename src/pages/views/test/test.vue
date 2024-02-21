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
  <childCompontent class="transfer-child" />
</template>

<script setup lang="ts">
import { ref, reactive, proxyRefs, onMounted, computed } from 'vue'
import childCompontent from '@/pages/views/test/childComponent.vue'

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
