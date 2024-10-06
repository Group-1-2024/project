<template>
  <div
    class="dark:from-[#2c1a2b] dark:to-[#1a1c23] bg-gradient-to-b from-[#E6E6FB] to-[#f1f1f1] opacity-0.2"
  >
    <Search></Search>
    <Swiper
      loop
      autoplay
      pagination
      :modules="[Autoplay, Pagination]"
      class="h-[36vw] w-[91vw] rounded-[20px]"
    >
      <SwiperSlide v-for="item in props.data" :key="item">
        <img :src="item" alt="" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import Search from "@/views/Home/children/Search.vue";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css/autoplay";

import "swiper/css/pagination";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>
