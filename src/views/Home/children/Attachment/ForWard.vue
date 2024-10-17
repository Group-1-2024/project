<template>
  <Button type="" @click="showDrawerTow" ghost="ture"></Button>
  <Drawer
    v-model:open="open"
    class="custom-class"
    style="color: red"
    placement="bottom"
    @after-open-change="afterOpenChangeTow"
  >
    <div>
      <img src="../../../../../public/images/zf.png" alt="" />
    </div>
  </Drawer>
</template>
<script setup>
import { ref } from "vue";

import { Button, Drawer } from "ant-design-vue";
const open = ref(false);
const afterOpenChangeTow = (bool) => {
  console.log("open", bool);
};
const showDrawerTow = () => {
  open.value = true;
};
</script>

<style>
img {
  width: 100%;
}
</style>
