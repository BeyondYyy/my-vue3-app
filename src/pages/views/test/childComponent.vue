<template>
  <p class="poo" v-bind="attrs">{{ con }}</p>
  <span> 未透传 </span>
</template>
<script setup lang="ts">
import { ref, useAttrs } from 'vue'

const con = ref('Child')
const attrs = useAttrs()
</script>
<style lang="scss" scoped>
.poo {
  font-weight: 500;
}
</style>
