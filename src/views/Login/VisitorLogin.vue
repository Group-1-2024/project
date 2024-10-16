<template>
  <div
    class="mt-[50px] flex items-center justify-start gap-[100px] ml-[20px] text-[18px] font-bold"
  >
    <Icon
      @click="router.back()"
      icon="ph:arrow-left"
      width="32"
      height="32"
      style="color: black"
    />
    <h1>游客登录</h1>
  </div>
  <div class="visitor-login">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          placeholder="请输入用户名"
        />
      </div>
      <button
        type="submit"
        class="bg-[#ff3a30] text-white w-[90%] h-[40px] rounded-[20px] mt-[40px] ml-[20px]"
      >
        登录
      </button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

import { useRouter } from "vue-router";
import { getVisitorLogin } from "@/api";
import { showToast } from "vant";
import localforage from "localforage";
// import { useUserStore } from "../../store/user";
import { useUserStore } from "@/store";
// import MyCenter from "../Home/MyCenter.vue";
// 定义状态
const username = ref("");
const errorMessage = ref("");
const router = useRouter();
const userInfo = ref(null);
const userStore = useUserStore();
// 登录成功后的处理
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
// userStore.setUser({ avatar: 'guest-avatar.png' });
// 处理登录函数
const handleLogin = () => {
  // 加载用户数据
  loadUserData();
  // 获取游客登录信息
  getVisitorLogin().then((res) => {
    console.log(res);
    // 如果返回的数据中有cookie
    if (res.data.cookie) {
      // 将用户信息保存到本地存储
      localforage
        .setItem("userInfo", res.data)
        .then(() => {
          router.push("/mycenter");
          showToast("游客登录成功");
          // 更新用户信息
          userStore.userInfo({ avatarUrl: "/public/default.png" });
        })
        .catch((err) => {
          // 如果保存失败，打印错误信息
          console.log(err, "保存失败");
        });
    } else {
      // 如果没有cookie，显示登录失败的提示
      showToast("游客登录失败");
    }
  });
};

</script>

<style scoped>
.visitor-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
