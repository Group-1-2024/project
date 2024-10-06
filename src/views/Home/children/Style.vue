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
      <div class="flex w-[200vw] flex-wrap">
        <div
          @click="clickHandler(item)"
          v-for="item in props.data.children"
          :key="item.id"
          class="w-[87vw] h-[15vw] ml-[4vw] flex mb-[3vw]"
        >
          <img
            class="rounded-[10%] w-[15vw] h-[15vw]"
            :src="item.imageUrl"
            alt=""
          />
          <div class="w-[50vw] h-[15vw] flex flex-col justify-center pl-[3vw]">
            <div class="text-[#3e4659] font-bold text-[15px]">
              {{ item.title }}
            </div>
            <div class="text-[#7c818e] text-[13px]">{{ item.artists }}</div>
          </div>
        </div>
      </div>
    </BetterScroll>
  </Wrapper>
</template>
<script setup>
import { defineProps } from "vue";
import BetterScroll from "@/components/BetterScroll.vue";
import Wrapper from "@/components/Wrapper.vue";

const props = defineProps({
  data: {},
});

const clickHandler = () => {};

const moreHandler = () => {
  console.log("精选的更多被点击了");
};

const titleHandler = () => {
  console.log("精选歌单的标题被点击了");
};
</script>
