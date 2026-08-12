<template>
  <router-view :key="route.fullPath" />
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    return { route };
  },
};
</script>

<style>
@import '@/assets/base.css';
</style>
