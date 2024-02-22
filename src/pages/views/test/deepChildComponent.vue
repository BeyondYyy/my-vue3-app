<template>
  <el-text>Deep child</el-text>
  <br />
  <el-text type="primary">{{ provideText }}</el-text>
  <br />
  <el-button @click="handleChangeProvideMessage">{{ provideText }}</el-button>
  <br />
  <el-input v-model="provideText" @change="handleChangeProvideMessage" />
  <br />
  <el-input v-model="provideReadonlyCount" />
  <el-text type="danger">{{ provideReadonlyCount }}</el-text>
</template>
<script setup lang="ts">
import { inject } from 'vue'
const { provideText, handleChangeProvideMessage }: any = inject('provideMessage')
const provideReadonlyCount: any = inject('read-only-count')
</script>
