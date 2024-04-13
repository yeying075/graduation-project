<script setup lang="ts">
const router = useRouter()

const identityStore = useIdentityStore()
const handleSelect = () => {
  identityStore.removeIdentity()
  router.push('/login')
}
const TAG = {
  TITLE: '用户',
  account: '账号',
  password: '密码',
  username: '用户名',
  name: '姓名',
  profession_name: '专业名称',
  class_name: '班级名称',
  role: '角色',
  profession_hash_id: '专业id',
  class_hash_id: '班级id',
  phone: '电话',
  email: '邮箱'
}
const getByIdUserAPI = (id) => {
  return req.post(`/api/v1/system/user/${id}/detail`)
}
const dialogVisibleCheck = ref(false)
const CheckForm = ref({})
const handleCheck = async (e) => {
  // e.preventDefault()
  const {
    data: { data: res }
  } = await getByIdUserAPI(identityStore.identity.id)
  console.log(res)
  CheckForm.value = res
  dialogVisibleCheck.value = true
}
</script>

<template>
  <div class="block">
    <el-container>
      <el-header>
        <el-text type="primary"> {{ PROJECT_NAME }} </el-text>
        <el-menu mode="horizontal" :ellipsis="false">
          <el-sub-menu index="1">
            <template #title>
              <div class="info-box">
                {{ identityStore.identity.username }}
              </div>
            </template>
            <el-menu-item index="1-1" @click="handleSelect">退出登录</el-menu-item>
            <el-menu-item index="1-2" @click="handleCheck"> 用户详情 </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu mode="vertical" router :default-active="$route.path">
            <!--            :disabled="identityStore.identity.privilege !== 0"-->
            <el-menu-item index="/main/user">
              <div>
                <span>用户</span>
              </div>
            </el-menu-item>
            <el-menu-item index="/main/project">
              <div>
                <span>项目</span>
              </div>
            </el-menu-item>
            <el-menu-item index="/main/resume">
              <div>
                <span>简历</span>
              </div>
            </el-menu-item>
            <el-menu-item index="/main/interview">
              <div>
                <span>面试</span>
              </div>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>

  <el-dialog
    class="checkDialog"
    :title="`查看${TAG.TITLE}`"
    align-center
    v-model="dialogVisibleCheck"
  >
    <el-descriptions title="用户" :column="3" size="" border>
      <template #title>
        <div class="checkDescriptionsTitle">用户</div>
      </template>
      <el-descriptions-item label="uid">
        {{ CheckForm.uid }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.username">
        {{ CheckForm.username }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.name">
        {{ CheckForm.name }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.role">
        {{ CheckForm.role }}
      </el-descriptions-item>
      <el-descriptions-item label="专业id">
        {{ CheckForm.class_name }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.profession_name">
        {{ CheckForm.profession_name }}
      </el-descriptions-item>
      <el-descriptions-item label="班级id">
        {{ CheckForm.class_hash_id }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.class_name">
        {{ CheckForm.class_name }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.role">
        {{ CheckForm.Phone }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.role">
        {{ CheckForm.Emial }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<style scoped lang="scss">
.block,
.el-container,
.el-menu {
  height: 100%;
}

.el-container {
  min-width: 1170px;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px 0 rgb(222, 222, 222);
  z-index: 2;
}
.el-header > .el-text {
  position: relative;
  left: 106px;
  font-size: 18px;
  font-weight: bold;
}
.el-header .el-menu {
  position: relative;
  left: 40%;
}
:deep(.el-header .el-sub-menu__title) {
  font-size: 16px;
}

.el-main {
  padding: 0;
  background-color: #f7f8fa;
}

.el-aside {
  width: 160px;
  font-size: 18px;
}

.el-aside .el-menu {
  border-right: 0;
}
.el-aside .el-menu-item {
  height: 70px;
  //display: flex;
  //justify-content: center;
  font-size: 18px;
  //color: rgb(100, 100, 100);
}
.el-aside .el-menu-item {
  height: 70px;
  //display: flex;
  //justify-content: center;
  font-size: 18px;
  //color: rgb(100, 100, 100);
}
.el-aside .el-menu-item {
  height: 70px;
  //display: flex;
  //justify-content: center;
  font-size: 18px;
  color: rgb(100, 100, 100);
}
.el-aside .is-active {
  height: 70px;
  //display: flex;
  //justify-content: center;
  font-size: 18px;
  color: $color-primary;
}
.el-aside .el-menu-item div {
  position: relative;
  left: 10px;
}
</style>
