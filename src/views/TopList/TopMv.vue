<template>
  <div class="text-center font-bold h-[12vw] leading-[12vw] text-[16px]">
    MV排行榜
  </div>
  <van-tabs v-model:active="active" @click-tab="onClickTab" sticky>
    <van-tab
      :title="area"
      v-for="(area, index) in areaList"
      :key="index"
      style="color: red"
    >
      <div
        v-for="(item, index) in TopMvData"
        :key="index"
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
import { ref, watchEffect } from "vue";
import { useRequest } from "vue-request";
import { Icon } from "@iconify/vue";
// import { useRequest } from "vue-request";
// "内地", "港台", "欧美", "日本", "韩国"
const areaList = ["内地", "港台", "欧美", "日本", "韩国"];
const active = ref(0);
const areaName = ref("内地");
const TopMvData = ref([]);
function formatNum(number) {
  if (number < 10000) {
    return number.toString(); // 不足五位数，直接返回
  }
  if (number < 100000000 && number >= 10000) {
    const wan = Math.round(number / 10000).toString();
    return `${wan}万`;
  }
  const yi = Math.round(number / 100000000).toString();
  return `${yi}亿`;
}
// getTopMv({
//   params: {
//     area: areaName.value,
//   },
// }).then((res) => {
//   TopMvData.value = res.data.data.map((item) => ({
//     id: item.id,
//     artname: item.artists[0].name,
//     mvImg: item.cover,
//     mvId: item.mv.id,
//     mvtitle: item.mv.title,
//     playCount: item.playCount,
//   }));
//   console.log(TopMvData);

//   return TopMvData;
// });

const { data: res } = useRequest(
  () =>
    getTopMv({
      area: areaName.value,
    }),
  {
    refreshDeps: areaName,
  }
);
function onClickTab() {
  areaName.value = areaList[active.value];
  console.log(areaName.value);
}
watchEffect(() => {
  if (res.value && res.value.data) {
    TopMvData.value = res.value.data.data.map((item) => ({
      id: item.id,
      artname: item.artists[0].name,
      mvImg: item.cover,
      mvId: item.mv.id,
      mvtitle: item.mv.title,
      playCount: item.playCount,
    }));
  }
});

// getTopMv({
//   area: areaName.value,
// })
//   .then((res) => {
//     TopMvData.value = res.data.data.map((item) => ({
//       id: item.id,
//       artname: item.artists[0].name,
//       mvImg: item.cover,
//       mvId: item.mv.id,
//       mvtitle: item.mv.title,
//       playCount: item.playCount,
//     }));
//   })
//   .catch((error) => {
//     showToast("Failed to load data");
//     console.error(error);
//   });
</script>
<style scoped></style>
