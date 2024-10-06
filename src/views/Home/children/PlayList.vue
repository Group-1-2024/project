<template>
  <Wrapper
    :title="props.data.name"
    @clickMore="moreHandler"
    @clickTitle="titleHandler"
  >
    <BetterScroll
      :config="{ scrollX: true, scrollY: false, click: true }"
      :dep="props.data"
    >
      <div
        @click="clickHandler(item)"
        v-for="item in props.data.children"
        :key="item.id"
        class="w-[32vw] ml-[4vw]"
      >
        <img class="rounded-2xl size-[32vw]" :src="item.imageUrl" alt="" />
        <div class="line-clamp-2 text-[13px]">{{ item.title }}</div>
      </div>
    </BetterScroll>
  </Wrapper>
</template>
<script setup>
import { defineProps } from "vue";
import BetterScroll from "@/components/BetterScroll.vue";
import Wrapper from "@/components/Wrapper.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  data: {},
});

const clickHandler = (item) => {
  console.log(item);
  router.push(`/SongList?id=${item.id}`);
};

const moreHandler = () => {
  console.log("推荐歌单的更多被点击了");
};

const titleHandler = () => {
  console.log("推荐歌单的标题被点击了");
};
</script>
