<!-- <template>
    <el-tag>
        <slot name="header"></slot>
    </el-tag>
    <el-button class="el-button">
        <slot name="content">默认内容</slot>
    </el-button>
</template> -->
<!-- 默认作用域插槽 -->
<!-- <template>
    <slot :text="slotText" :count="slotCount"></slot>
</template> -->
<template>
  <el-tag>
    <slot name="header" message="Hello"></slot>
  </el-tag>
  <el-button class="el-button">
    <slot name="content">默认内容</slot>
  </el-button>
  <div>注入: {{ provideText }}</div>
</template>
<script setup>
import { ref } from 'vue'

const slotText = 'slot text'
const slotCount = ref(11)
</script>
