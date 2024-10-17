<template>
  <PageTransition>
    <RouterView />
  </PageTransition>
  <TabBar v-if="!hideTabBar"></TabBar>
</template>
<script setup>
import { useRoute } from "vue-router";
import { watchEffect, ref } from "vue";
import TabBar from "./views/Tabbar/TabBar.vue";
import PageTransition from "./components/PageTransition.vue";

const hideTabBar = ref(false);
const route = useRoute();
watchEffect(() => {
  if (route.path === "/SongList" || route.path === "/QRlogin") {
    hideTabBar.value = true;
  } else {
    hideTabBar.value = false;
  }
  console.log(route.path);
});
</script>
