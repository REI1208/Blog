<template>
  <n-message-provider>
    <RouterView></RouterView>
  </n-message-provider>
</template>

<script setup>

import { RouterView } from 'vue-router';
import { NMessageProvider } from 'naive-ui'

</script>

<style scoped></style>
