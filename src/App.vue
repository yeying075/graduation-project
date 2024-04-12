<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(75, 75, 75);
}

.el-dialog {
}
.insertDialog .el-dialog__body,
.updateDialog .el-dialog__body {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  right: 25px;
}

.updateDialogOrder .el-dialog__body {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
