<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<template>
  <div>
    <!-- 顶部模块 -->
    <div class="w-[100%] h-[40px] bg-[#2D2D2D] flex items-center pl-[15px]">
      <Icon
        @click="router.back()"
        icon="ph:arrow-left"
        width="24"
        height="24"
        style="color: darkgray"
      />
      <p class="font-bold text-[#ffffff] leading-[40px] ml-[15px]">邮箱登录</p>
    </div>
    <!-- 登录模块 -->
    <div class="flex justify-center items-center mt-[100px] flex-col space-x-4">
      <!-- 邮箱地址 -->
      <div class="flex items-center justify-start">
        <svg
          class="h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          stroke="currentColor"
        >
          <!-- 图标内容 -->
          <Icon
            icon="simple-line-icons:user"
            width="64"
            height="64"
            style="color: darkgray"
            class="ml-[25px] border-2 inline-block"
          />
        </svg>
        <input
          type="email"
          id="email"
          class="shadow appearance-none border w-[300px] py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline m-[10px]"
          placeholder="请输入邮箱地址"
          v-model="emailInfo.email"
        />
      </div>
      <!-- 登录密码 -->
      <div class="flex items-center justify-start ">
        <svg
          class="h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          stroke="currentColor"
        >
          <Icon
            icon="mdi:password"
            width="64"
            height="64"
            style="color: darkgray"
            class="m-[10px] border-2 inline-block"
          />
        </svg>
        <input
          type="text"
          id="password"
          class="shadow appearance-none border w-[300px] py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline mr-[15px]"
          placeholder="请输入邮箱登录密码"
          v-model="emailInfo.password"
        />
      </div>
    </div>
    <!-- 登录按钮 -->
    <div>
      <button
        @click="goemailLogin"
        class="bg-[#ff3a30] text-white w-[90%] h-[40px] rounded-[20px] mt-[40px] ml-[20px]"
      >
        登录
      </button>
    </div>
    <!-- 忘记密码 -->
    <div class="flex justify-end items-center mt-[20px] mr-[20px]">
      <p class="text-[#B1B1B1] mr-[10px] text-[14px]">忘记密码？</p>
    </div>
    <!-- 其他方式登录 -->
    <div
      class="flex justify-start items-center mt-[20px] w-[100%] h-[50px] bg-[#F7F7F7]"
      @click="router.back()"
    >
      <Icon
        icon="iconamoon:arrow-left-2-bold"
        width="24"
        height="24"
        style="color: #0c72c3"
      />
      <p class="text-[#0C72C3] text-[14px]">其他方式登录</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { getEmailLogin } from "@/api";
import localforage from "localforage";
import { showToast } from "vant";

const router = useRouter();
const emailInfo = ref({
  email: "",
  password: "",
});
const goemailLogin = () => {
  // eslint-disable-next-line max-len
  if (!emailInfo.value.email || !emailInfo.value.password) {
    showToast("邮箱或密码不能为空");
    return;
  }
  // 基本的邮箱格式验证
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInfo.value.email)) {
    showToast("请输入有效的邮箱地址");
    return;
  }
  getEmailLogin({
    email: emailInfo.value.email,
    password: emailInfo.value.password,
  })
    .then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        localforage
          .setItem("emailInfo", {
            email: emailInfo.value.email,
            password: emailInfo.value.password,
          })
          .then(() => {
            localforage.getItem("emailInfo").then((storedInfo) => {
              if (storedInfo) {
                // 比较输入的邮箱和密码与本地存储的是否一致
                if (
                  storedInfo.email === emailInfo.value.email
                  && storedInfo.password === emailInfo.value.password
                ) {
                  showToast("登录成功");
                  router.replace("/");
                } else {
                  showToast("邮箱或密码错误，请重新输入");
                }
              } else {
                showToast("没有找到用户信息，请先注册或登录");
              }
            });
          })
          .catch((error) => {
            console.error("存储用户信息出错", error);
          });
      } else {
        showToast("邮箱输入错误，请重新输入");
      }
    })
    .catch((err) => {
      console.log("出错了", err);
    });
};
</script>

<style scoped></style>
