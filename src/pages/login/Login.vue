<template>
  <div>Login</div>
  <div>用户名：{{ mainStore.name }}</div>
  <div>长度: {{ mainStore.nameLength }}</div>
  <el-button type="primary" @click="changeName">修改用户名长度</el-button>
  <el-button type="success" @click="handleRequest">Success</el-button>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store/main'
import loginApi from '@/service/api/login/login'

const mainStore = useMainStore()

const changeName = () => {
  mainStore.$patch({
    name: '修改后的名称',
  })
}

const handleRequest = () => {
  const params = {
    code: '5',
    password: 'admin123',
    username: 'admin',
    uuid: 'b4c4887a5c214dca878b1e374d943a56',
  }
  const P1 = { smartDeviceDetailsId: '17' }
  loginApi.login(params)
}
</script>
