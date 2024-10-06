<template>
  <div>
    <div
      class="h-[70vw] transition-all duration-20 0 relative bg-gradient-to-br from-[#486D8D] to-[#6186AB] pb-[5vw] pl-[3.9vw] pr-[3.4vw] pt-[13.5vw]"
      :style="{ background: randomColor() }"
    >
      <nav
        class="a2 pl-[3.9vw] pr-[3.4vw] h-[13.5vw] flex items-center justify-between"
      >
        <div class="flex items-center">
          <Icon
            icon="bx:arrow-back"
            width="24"
            height="24"
            style="color: #fff"
            @click="backToHome"
          />
          <div
            class="w-[42vw] h-[13.5vw] flex items-center overflow-hidden relative"
          >
            <div class="text-[4.2vw] text-[#fff] ml-[4.7vw] relative">歌单</div>
          </div>
        </div>
        <div class="flex items-center">
          <Icon
            icon="ion:search-sharp"
            width="24"
            height="24"
            style="color: #fff"
            class="mr-[5vw]"
          />
          <Icon
            icon="charm:menu-kebab"
            width="24"
            height="24"
            style="color: #fff"
          />
        </div>
      </nav>
      <!-- <div
        class="fixed top-0 h-[13.5vw] w-[100vw] left-0 z-[998] opacity-0"
      ></div> -->
    </div>
  </div>
  <button @click="taptap">点击</button>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { useRequest } from "vue-request";
import {
  getPlaylistDetail,
  getPlaylistTrackAll,
  getRelatedPlaylist,
} from "@/api";

const router = useRouter();
function backToHome() {
  router.push("/home");
}

const SongListid = ref(router.currentRoute.value.query.id);
// 歌单
const { data: SongListTrack } = useRequest(
  () =>
    getPlaylistTrackAll({
      id: SongListid.value,
    }),
  {
    refreshDeps: SongListid,
  }
);
const { data: SongListDetail } = useRequest(
  () =>
    getPlaylistDetail({
      id: SongListid.value,
    }),
  {
    refreshDeps: SongListid,
  }
);

const { data: RelatedSongList } = useRequest(
  () =>
    getRelatedPlaylist({
      id: SongListid.value,
    }),
  {
    refreshDeps: SongListid,
  }
);
watchEffect(() => {});
console.log(SongListTrack);
console.log(SongListDetail);
console.log(RelatedSongList);

function randomColor() {
  const r = Math.floor(Math.random() * 256); // 生成0-255的随机数
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`; // 返回rgb颜色格式
}
</script>
<style scoped>
.a2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
