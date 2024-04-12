<script setup lang="ts">
import { ElLoading } from 'element-plus'
const codeAPI = () => {
  return req.get('/api/v1/auth/captcha')
}

const loginAPI = (o) => {
  return req.post('/api/v1/auth/login', o.value)
}
const getCode = () => {
  codeAPI().then((res) => {
    const base = res.data
    form1.value.captcha_id = base.data.CapthchaID
    img.value = base.data.Image
  })
}
const identity = ref({})
const identityStore = useIdentityStore()
const form1 = ref({})
const img = ref()
const handleLogin = async () => {
  const loading = ElLoading.service()
  await loginAPI(form1)
    .then((res) => {
      const base = res.data
      identityStore.setIdentity(base.data)
      router.push('/')
    })
    .finally(() => {
      loading.close()
    })
  getCode()
}
onMounted(() => {
  getCode()
})
</script>

<template>
  <div class="block">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <el-text type=""> {{ PROJECT_NAME }} </el-text>
        </div>
      </template>
      <div id="top">
        <el-input
          v-model.trim="form1.account"
          autofocus
          placeholder="用户名"
          @keyup.enter="handleLogin"
        />
        <el-input
          v-model.trim="form1.password"
          show-password
          placeholder="密码"
          @keyup.enter="handleLogin"
        />
        <el-row justify="space-around" align="middle">
          <el-col :span="12">
            <el-input
              v-model.trim="form1.captcha_value"
              class="input-code"
              placeholder="验证码"
              @keyup.enter="handleLogin"
            />
          </el-col>
          <el-col :span="12">
            <img :src="img" @click="getCode" />
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <div>
          <el-button type="primary" size="large" @click="handleLogin">登录</el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.block {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f8fa;
}

.box-card {
  height: 400px;
  width: 480px;
  position: relative;
  bottom: 50px;
}

#top > .el-input {
  height: 45px;
  width: 360px;
  font-size: 16px;
}

.el-input:nth-child(2) {
  margin-top: 20px;
}

:deep(.el-row) {
  height: 100px;
  //width: 360px;
}

.input-code {
  //display: inline-block;
  height: 45px;
  width: 140px;
}

img {
  //display: inline;
  height: 60px;
}

.el-text {
  font-size: 22px;
  font-weight: bold;
}
//.item {
//  margin-bottom: 40px;
//  width: 280px;
//}

.el-button {
  width: 360px;
  font-size: 16px;
}
</style>
