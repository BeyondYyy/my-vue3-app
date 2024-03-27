<template>
  <h2>这是异步组件</h2>
  <div>{{ content }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('内容')
</script>
