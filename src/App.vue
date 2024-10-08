<template>
  <PageTransition>
    <RouterView />
  </PageTransition>
  <TabBar></TabBar>
</template>
<script setup>
import TabBar from "./views/Tabbar/TabBar.vue";
import PageTransition from "./components/PageTransition.vue";
</script>
