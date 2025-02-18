<script setup lang="ts">
import BasicLayout from '@/components/BasicLayout.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const locale = zhCN
</script>

<template>
  <a-config-provider :locale="locale">
    <BasicLayout />
  </a-config-provider>
</template>

<style scoped></style>
