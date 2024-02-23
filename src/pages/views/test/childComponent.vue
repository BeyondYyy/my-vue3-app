<template>
  <p class="poo" v-bind="attrs">{{ con }}</p>
  <br />
  <span> 未透传 </span>
  <br />
  <DeepChildComponent />
</template>
<script setup lang="ts">
import { ref, useAttrs } from 'vue'
import DeepChildComponent from '@/pages/views/test/deepChildComponent.vue'

const con = ref('Child')
const attrs = useAttrs()
</script>
<style lang="scss" scoped>
.poo {
  font-weight: 500;
}
</style>
