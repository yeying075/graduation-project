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
      getCode()
    })
}
onMounted(() => {
  getCode()
})
</script>

<template>
  <div class="block">
    <el-card class="box-card" shadow="">
      <template #header>
        <div class="card-header">
          <span> {{ PROJECT_NAME }} </span>
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
            <img :src="img" @click="getCode" style="background-color: white" />
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
  background-image: url('public/0164be59759829a8012193a307b07f.png@2o.png');
  background-size: cover;
}
.block {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f8fa;
}

:deep(.el-card__header) {
  border: 0;
}
:deep(.el-card__footer) {
  border: 0;
}
.box-card {
  height: 400px;
  width: 480px;
  position: relative;
  bottom: 50px;
  font-size: 30px;
  font-weight: bold;
  //color: black;
  border: 1px solid transparent;
  //box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.2);
  background-color: transparent;
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
