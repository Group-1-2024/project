<template>
  <div class="text-center font-bold h-[12vw] leading-[12vw] text-[16px]">
    MV排行榜
  </div>
  <van-tabs v-model:active="active" sticky>
    <van-tab :title="area" v-for="(area, index) in areaList" :key="index">
      <div
        v-for="(item, index) in TopMvData"
        :key="item.id"
        class="w-[92vw] relative m-auto mt-[2vw]"
      >
        <img :src="item.mvImg" class="w-[92vw] h-[53vw] rounded-[10px]" />
        <div class="h-[12vw] pl-[2vw]">
          <div class="pt-[1vw] items-center flex">
            <div class="text-[#ff0000]">{{ index + 1 }}</div>
            <div class="pl-[4vw] text-[15px] font-bold">{{ item.mvtitle }}</div>
          </div>
          <div>
            <span class="text-[#7c7c7c] text-[8px] pl-[6vw]">{{
              item.artname
            }}</span>
          </div>
        </div>
        <div class="absolute right-[2vw] top-[5px] flex">
          <Icon
            icon="icon-park-solid:play-one"
            width="15"
            height="15"
            style="color: white"
          />
          <span class="text-[white] text-[12px]">{{
            formatNum(item.playCount)
          }}</span>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { getTopMv } from "@/api";
import { ref, computed } from "vue";
import { useRequest } from "vue-request";
import { Icon } from "@iconify/vue";

// 地区列表
const areaList = ["内地", "港台", "欧美", "日本", "韩国"];
const active = ref(0); // 当前选中的tab索引
const areaName = computed(() => areaList[active.value]); // 根据索引计算当前地区

// 获取MV数据的请求
const { data: res } = useRequest(() => getTopMv({ area: areaName.value }), {
  refreshDeps: areaName,
});

// 处理MV数据，映射到需要的格式
const TopMvData = computed(
  () =>
    res.value?.data?.data?.map((item) => ({
      id: item.id,
      artname: item.artists[0].name,
      mvImg: item.cover,
      mvId: item.mv.id,
      mvtitle: item.mv.title,
      playCount: item.playCount,
    })) || []
);

// 格式化播放次数为“万”或“亿”
function formatNum(number) {
  if (number < 1e4) return number.toString();
  if (number < 1e8) return `${Math.round(number / 1e4)}万`;
  return `${Math.round(number / 1e8)}亿`;
}
</script>

<style scoped></style>
