<template>
  <van-tabbar v-model="active" inactive-color="#9296a1" active-color="#eb4a52">
    <van-tabbar-item to="/home">
      <span>首页</span>
      <template #icon="props">
        <Icon
          :icon="props.active ? icon.icon1.active : icon.icon1.inactive"
          width="24"
          height="24"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/topMv" icon="search">
      <span>排行榜</span>
      <template #icon="props">
        <Icon
          :icon="props.active ? icon.icon2.active : icon.icon2.inactive"
          width="24"
          height="24"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="friends-o">
      <span>我的</span>
      <template #icon="props">
        <Icon
          :icon="props.active ? icon.icon3.active : icon.icon3.inactive"
          width="24"
          height="24"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="setting-o">
      <span>关注</span>
      <template #icon="props">
        <Icon
          :icon="props.active ? icon.icon4.active : icon.icon4.inactive"
          width="24"
          height="24"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="comment-o">
      <span>社区</span>
      <template #icon="props">
        <Icon
          :icon="props.active ? icon.icon5.active : icon.icon5.inactive"
          width="24"
          height="24"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
// import { showToast } from "vant";
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const active = ref(0);
const icon = {
  icon1: {
    active: "ri:netease-cloud-music-fill",
    inactive: "ri:netease-cloud-music-fill",
  },
  icon2: {
    active: "ic:baseline-bar-chart",
    inactive: "ic:baseline-bar-chart",
  },
  icon3: {
    active: "icon-park-outline:music",
    inactive: "icon-park-outline:music",
  },
  icon4: {
    active: "iconoir:user-love",
    inactive: "iconoir:user-love",
  },
  icon5: {
    active: "ph:wechat-logo",
    inactive: "ph:wechat-logo",
  },
};
</script>
