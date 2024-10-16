<!-- eslint-disable max-len -->
<!-- 首页登录 -->
<template>
   <PopUp @agree="onAgree" @exit="onExit" v-if="showPopup" />
  <div class="w-[100%] h-screen bg-[#ff2c2c]">
    <div class="flex items-center justify-center">
      <div
        class="z-index-80 w-[70px] h-[70px] mt-[40%] rounded-[50%] bg-[#ff0000]"
      >
        <Icon
          class="ml-[6px] mt-[6px]"
          icon="ri:netease-cloud-music-line"
          width="56"
          height="56"
          style="color: white"
        />
      </div>
    </div>
    <!-- 登录模块 -->
    <div class="w-[100%] mt-[200px]">
      <!-- 手机登录 -->
      <div
        class="w-[100%] h-[120px] border-[white] flex items-center justify-center mt-[120px]"
      >
        <div>
          <p
            @click="handlePhoneLogin"
            class="text-[red] text-center rounded-3xl leading-[40px] w-[70vw] h-[40px] bg-[white] m-[10px]"
          >
            手机号登录
          </p>
          <p
            class="text-[white] text-center rounded-3xl leading-[40px] w-[70vw] h-[40px] border-2 border-[white] m-[10px] inline-block"
            @click="handleVisitorLogin"
          >
            立即体验
          </p>
        </div>
      </div>
      <!-- 其他方式登录 -->
      <div
        class="w-[100%] h-[50px] border-[white] flex items-center justify-center flex-nowrap box-border"
      >
        <div
          class="w-[36px] h-[36px] border-2 border-[#a7a7a7] mr-[30px] rounded-full border-opacity-25"
        >
          <Icon
            icon="ic:baseline-wechat"
            width="28"
            height="28"
            style="color: white"
            class="m-auto mt-[2px]"
          />
        </div>
        <div
          class="w-[36px] h-[36px] border-2 border-[#a7a7a7] mr-[30px] rounded-full border-opacity-25"
        >
          <Icon
            icon="mingcute:qq-fill"
            width="24"
            height="24"
            style="color: white"
            class="m-auto mt-[3px]"
          />
        </div>
        <div
          class="w-[36px] h-[36px] border-2 border-[#a7a7a7] mr-[30px] rounded-full border-opacity-25"
        >
          <Icon
            icon="mdi:sina-weibo"
            width="24"
            height="24"
            style="color: white"
            class="m-auto mt-[3px]"
          />
        </div>
        <div
        @click="goEmailLogin"
          class="w-[36px] h-[36px] border-2 border-[#a7a7a7] mr-[30px] rounded-full border-opacity-25"
        >
          <Icon
            icon="arcticons:netease-mail"
            width="24"
            height="24"
            style="color: white"
            class="m-auto mt-[3px]"
          />
        </div>
      </div>
      <!-- 底部文字 -->
      <div class="flex items-center justify-center mt-[20px]">
        <input
          type="checkbox"
          v-model="agreed"
          class="border-opacity-25 border-gray-300 bg-[#ff2c2c]"
        />
        <span class="text-[white] text-[10px]">
          同意《用户协议》《隐私政策》《儿童隐私政策》
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import localforage from "localforage";
import { showToast } from "vant";
import PopUp from "./PopUp.vue";

const router = useRouter();
const showPopup = ref(true); // 控制弹窗显示
const onAgree = async () => {
  showPopup.value = false; // 用户同意后隐藏弹窗
  await localforage.setItem("userAgreed", true); // 使用 localforage 记录用户已同意状态
};
const onExit = () => {
  // 如果不同意 则退出登录
  router.push("/login");
  showToast("您已退出登录");
};

onMounted(async () => {
  // 页面加载时检查用户是否已同意条款
  const isAgreed = await localforage.getItem("userAgreed");
  if (isAgreed) {
    showPopup.value = false; // 已同意则隐藏弹窗
  }
});

// 声明一个变量 用于记录用户是否同意协议 默认为false
const agreed = ref(false);
const handlePhoneLogin = () => {
  if (agreed.value) {
    // 跳转手机登录页面
    router.push("/phonelogin");
  } else {
    // 提示用户未同意协议
    showToast({
      message: "请先勾选协议",
      position: "bottom",
    });
  }
};
// 游客登录
const handleVisitorLogin = () => {
  if (agreed.value) {
    router.push("/visitorlogin");
  } else {
    showToast({
      message: "请先勾选协议",
      position: "bottom",
    });
  }
};

// 邮箱登录
const goEmailLogin = () => {
  if (agreed.value) {
    router.push("/emailLogin");
  } else {
    showToast({
      message: "请先勾选协议",
      position: "bottom",
    });
  }
};
</script>

<style scoped></style>
