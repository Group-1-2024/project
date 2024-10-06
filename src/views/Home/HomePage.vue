<template>
  <!-- <Menu :menu="menu" /> -->
  <!-- BlockType 功能就是根据我传入的数据 对数据进行处理 并选择合适的组件渲染  -->
  <BlockType
    v-for="item in pageData"
    :data="item"
    :key="item.blockCode"
    class="bg-[#F4F4F4]"
  />
</template>
<script setup>
import { getHomePageData } from "@/api";
import BlockType from "@/views/Home/children/BlockType.vue";
import { useRequest } from "vue-request";
// import Menu from "./children/Menu.vue";

// const menu = ref([]);
// const pageData = ref([]);
// getHomePageData().then((res) => {
// console.log(
//   res.data.data.blocks.reduce((prev, current) => {
//     prev[current.blockCode] = "";
//     return prev;
//   }, {})
// );
// pageData.value = res.data.data.blocks;
// 对后台返回的数据进行预处理 适配组件的props
// menu.value = res.data.data.blocks
//   .find((item) => item.blockCode === "HOMEPAGE_BLOCK_OLD_DRAGON_BALL")
// .creatives[0].resources.map((item) => ({
//   name: item.uiElement.mainTitle.title,
//   iconUrl: item.uiElement.image.imageUrl,
// }));
// });
const { data: pageData } = useRequest(getHomePageData);
</script>
<style scoped>
.filter {
  filter: url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27><filter id=%27colorize%27><feColorMatrix type=%27matrix%27 values=%271 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0%27/></filter></svg>#colorize");
}
</style>
