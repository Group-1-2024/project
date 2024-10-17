<template>
  <div class="bg-[#fff] h-[100vh]">
    <div class="flex justify-between p-[2vw] h-[40px] items-center">
      <Icon
        icon="lets-icons:expand-left"
        width="24"
        height="24"
        style="color: black"
        @click="goBack"
      />
      <div @click="handlegetVisitorLogin" class="text-[grey]">游客登录</div>
    </div>
    <div class="flex flex-col justify-around h-[100vw]">
      <div class="flex justify-center">
        <img src="@/assets/logo.fill.svg" class="w-[38vw] h-[7vw]" alt="" />
      </div>
      <div class="flex justify-center p-[5vw]">
        <img
          :src="qrCode"
          class="w-[33vw] h-[33vw]"
          alt="QR Code"
          v-if="qrCode"
        />
      </div>
      <div class="flex justify-center items-center">
        <span class="text-[#000]"> 使用 </span>
        <a href="#" class="text-[#3c6a9d] m-[1vw]">网易云音乐App</a>
        <span class="text-[#000]"> 扫码登录 </span>
      </div>
    </div>
    <div>
      <img src="../../assets/images/bg.png" alt="" class="fixed bottom-0" />
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import {
  codeKey,
  code,
  codestatus,
  getUserInfo,
  getVisitorLogin,
  getInformation,
} from "@/api";
import { onMounted, ref } from "vue";

const router = useRouter();
const goBack = () => {
  router.go(-1);
};

const qrCode = ref("");
const qrStatus = ref("");
let interval = null;

// 异步生成二维码
const generateQRCode = async () => {
  try {
    const timestamp = Date.now();
    const { data: keyRes } = await codeKey({ timestamp });
    const key = keyRes.data.unikey;
    const { data: qrRes } = await code({ key, qrimg: true, timestamp });
    qrCode.value = qrRes.data.qrimg;
    return key;
  } catch (error) {
    console.error("二维码生成失败：", error);
    return null;
  }
};

// 检查二维码状态
const checkQRCodeStatus = async (key, noCookie = false) => {
  try {
    const timestamp = Date.now();
    const { data: statusRes } = await codestatus({ key, noCookie, timestamp });
    return statusRes;
  } catch (error) {
    console.error(
      "二维码状态获取失败：",
      error.response ? error.response.data : error
    );
    return null;
  }
};

// 登录成功后获取账号信息和用户详情
const handleLoginSuccess = async (cookie) => {
  try {
    console.log("传递的 Cookie:", cookie);
    const { data: userInfo } = await getUserInfo({ cookie });
    console.log("用户信息:", userInfo);

    // 获取用户详情
    const uid = userInfo.account.id;
    const { data: userDetail } = await getInformation({ uid });
    console.log("用户详情:", userDetail);

    // TODO: 在这里处理用户信息和用户详情，例如保存到本地存储或者状态管理
  } catch (error) {
    console.error(
      "获取用户信息失败:",
      error.response ? error.response.data : error
    );
  }
};

// 游客登录
const handlegetVisitorLogin = async () => {
  try {
    const { data: guestRes } = await getVisitorLogin();
    console.log("游客登录成功，Cookie:", guestRes.cookie);
    await handleLoginSuccess(guestRes.cookie);
  } catch (error) {
    console.error(
      "游客登录失败:",
      error.response ? error.response.data : error
    );
  }
};

// 处理二维码状态变化
const handleQRCodeStatus = async (key) => {
  const newStatus = await checkQRCodeStatus(key);
  if (newStatus) {
    qrStatus.value = newStatus.code;
    console.log("二维码状态:", qrStatus.value);

    switch (qrStatus.value) {
      case 800:
        console.log("二维码已过期");
        stopInterval();
        break;
      case 801:
        console.log("等待扫码...");
        break;
      case 802:
        console.log("待确认...");
        break;
      case 803:
        console.log("授权登录成功，返回 cookies:", newStatus.cookie);
        stopInterval();
        await handleLoginSuccess(newStatus.cookie);
        break;
      case 502:
        console.log("扫码失败，尝试无 Cookie 方式登录");
        const noCookieStatus = await checkQRCodeStatus(key, true);
        if (noCookieStatus && noCookieStatus.code === 803) {
          console.log("授权登录成功（无 Cookie 方式）:", noCookieStatus.cookie);
          stopInterval();
          await handleLoginSuccess(noCookieStatus.cookie);
        }
        break;
      default:
        console.log("未知状态:", qrStatus.value);
    }
  }
};

// 启动定时器
const startInterval = (key) => {
  interval = setInterval(() => handleQRCodeStatus(key), 5000);
};

// 停止定时器
const stopInterval = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

// 在组件挂载后生成二维码并启动状态轮询
onMounted(async () => {
  const key = await generateQRCode();
  if (key) {
    startInterval(key);
  } else {
    console.error("二维码数据获取失败");
  }
});
</script>
