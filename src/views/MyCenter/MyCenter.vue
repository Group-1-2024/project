<!-- eslint-disable max-len -->
<template>
  <div>
    <div v-if="userInfo">
      <div>
        <img
          class="w-[100%] h-[70vw]"
          :src="userInfo.profile.backgroundUrl"
          alt=""
        />
        <div
          @click="toggleMenu"
          class="relative flex justify-end transform translate-y-[-65vw] mr-[10px]"
        >
          <div class="mr-[75vw]">
            <Icon
              icon="zondicons:arrow-left"
              width="24"
              height="24"
              style="color: white"
            />
          </div>
          <Icon
            icon="mingcute:more-2-fill"
            width="32"
            height="32"
            style="color: white"
          />
          <Transition name="fade">
            <div
              v-if="showMenu"
              class="absolute right-0 mt-[32px] bg-white w-[80px] text-center rounded shadow"
            >
              <button @click="logout">退出登录</button>
            </div>
          </Transition>
        </div>
      </div>

      <div
        class="flex justify-center items-center z-40 transform translate-y-[-45px] w-[90%] h-[800px] ml-[5%] rounded-xl bg-[#f5f5f5]"
      >
        <div class="transform translate-y-[-100vw]">
          <!-- 头像 -->
          <img
            class="w-[20vw] h-[20vw] rounded-full ml-[30px]"
            :src="userInfo.profile.avatarUrl || '/public//default.png'"
            alt="用户头像"
            @error="handleImageError"
          />
          <!-- 昵称 -->
          <div class="w-[100%] mr-[10px] mt-2">
            <p class="font-extrabold w-[100%] ml-[15px]">
              {{ userInfo.profile.nickname }}
            </p>
          </div>
          <!-- 用户详情 -->
          <div class="flex text-[#848484]">
            <div class="m-[5px]">
              <p class="text-[12px] mr-[5px]">{{ userInfo.profile.follows }} 关注</p>
            </div>
            <div class="m-[5px]">
             <p class="text-[12px] mr-[5px]"> {{ Userfolloweds }} 粉丝</p>
            </div>
            <div class="m-[5px]">
              <p class="text-[12px] mr-[5px]">Lv.{{ userLevel }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p>未登录，请返回 <router-link to="/login">登录</router-link>.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import localforage from "localforage";
import { useRouter } from "vue-router";
// import { useUserStore } from "@/store/user";
import { showToast } from "vant";
import { Icon } from "@iconify/vue";
import { getInformation } from "@/api";
// const userStore = useUserStore();
const router = useRouter();
const userInfo = ref(null);
const userLevel = ref(null); // 定义一个响应式变量来保存用户等级
const Userfolloweds = ref(null); // 定义一个响应式变量来保存用户粉丝
// const useriPlaylist = ref({
//   uid: "7916748781",
//   limit: "",
// });
const gouserDetail = ref({
  uid: "7916748781",
});

const showMenu = ref(false); // 控制菜单显示与隐藏
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

// 定义一个函数，用于处理点击菜单外部的事件
const handleOutsideClick = (event) => {
  // 获取菜单元素
  const menuElement = document.querySelector(
    ".absolute.right-0.mt-[32px].bg-white.rounded.shadow",
  );
  // 如果点击的目标元素不在菜单元素内，则隐藏菜单
  if (!menuElement.contains(event.target)) {
    showMenu.value = false;
  }
};

// };
const userDetail = async () => {
  // 获取用户详情
  try {
    const response = await getInformation({ uid: gouserDetail.value.uid });
    userLevel.value = response.data.level;
    Userfolloweds.value = response.data.profile.followeds;
    console.log(response); // 在这里直接使用 response
  } catch (err) {
    console.error(err); // 捕获并处理错误
  }
};

userDetail();

const loadUserData = async () => {
  const userData = await localforage.getItem("userInfo");
  // 异步获取用户信息
  if (userData) {
    userInfo.value = userData;
  } else {
    userInfo.value = null; // 如果 userData 为 null 或 undefined
  }

  console.log("用户信息:", userInfo.value);
  return userInfo.value;
};

// const getInfo = async (userData) => {
//   try {
//     const response = await getInformation(userData);
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// };
const handleImageError = (e) => {
  e.target.src = "/path/to/default-avatar.png"; // 当图片加载失败时，使用默认头像
};
// const loadUserData = async () => {
//   try {
//     const userData = await localforage.setItem("userInfo");
//     if (userData) {
//       userInfo.value = JSON.parse(userData);
//     } else {
//       userInfo.value = null;
//     }
//   } catch (error) {
//     console.log("获取用户信息失败:", error);
//     userInfo.value = null;
//   }
// };

// 退出登录
const logout = async () => {
  try {
    await localforage.removeItem("userInfo");
    userInfo.value = null;
    router.push("/");
    showToast({ type: "success", message: "您已成功退出登录" });
  } catch (error) {
    showToast({ type: "danger", message: "退出登录失败,请重试" });
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
  loadUserData();
  getInformation();
  // getInfo();
});
// 在组件卸载时，移除点击事件监听器
onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
