<script setup lang="ts">
const router = useRouter()

const identityStore = useIdentityStore()
const handleSelect = () => {
  identityStore.removeIdentity()
  router.push('/login')
}
</script>

<template>
  <div class="block">
    <el-container>
      <el-header>
        <el-text type="primary"> {{ PROJECT_NAME }} </el-text>
        <el-menu mode="horizontal" :ellipsis="false" @select="handleSelect">
          <el-sub-menu index="1">
            <template #title>
              <div class="info-box">
                {{ identityStore.identity.username }}
              </div>
            </template>
            <el-menu-item index="1-1">退出登录</el-menu-item>
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
