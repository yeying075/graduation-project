<script setup lang="ts">
const handleClick = () => {
  router.push('/')
}
</script>

<template>
  <el-button id="my-button" type="primary" size="large" @click="handleClick">Main </el-button>
</template>

<style scoped lang="scss"></style>
