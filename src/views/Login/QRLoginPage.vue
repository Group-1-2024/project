<template>
  <div class="bg-[#fff] h-[100vh]">
    <div class="flex justify-between p-[2vw]">
      <Icon
        icon="lets-icons:expand-left"
        width="16"
        height="16"
        style="color: black"
        @click="goBack"
      />
      <div>游客登录</div>
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
        <span class="text-[#000]"> 使用 </span
        ><a href="#" class="text-[#3c6a9d] m-[1vw]">网易云音乐App</a>
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
import { codeKey, code, codestatus } from "@/api";
import { onMounted, ref } from "vue";

// 路由导航
const router = useRouter();
const goBack = () => {
  router.go(-1);
};

// 存储二维码 base64 数据
const qrCode = ref("");
// 存储二维码状态
const qrStatus = ref("");

// 异步生成二维码
const generateQRCode = async () => {
  try {
    const timestamp = Date.now(); // 获取时间戳
    const { data: keyRes } = await codeKey({ timestamp });
    const key = keyRes.data.unikey;
    const { data: qrRes } = await code({ key, qrimg: true, timestamp });

    return {
      qrCode: qrRes.data.qrimg,
      key,
    };
  } catch (error) {
    console.error("二维码生成失败：", error);
    return null;
  }
};

// 检查二维码状态
const checkQRCodeStatus = async (key, noCookie = false) => {
  try {
    const timestamp = Date.now(); // 获取时间戳
    const { data: statusRes } = await codestatus({ key, noCookie, timestamp });
    return statusRes; // 返回完整的状态对象
  } catch (error) {
    console.error(
      "二维码状态获取失败：",
      error.response ? error.response.data : error
    );
    return null; // 返回 null 以便调用者处理
  }
};

// 在组件挂载后生成二维码
onMounted(async () => {
  const qrCodeData = await generateQRCode();
  if (qrCodeData) {
    qrCode.value = qrCodeData.qrCode;
    const {key} = qrCodeData; // 保存 key 以便检查状态
    const interval = setInterval(async () => {
      const newStatus = await checkQRCodeStatus(key);
      if (newStatus) {
        qrStatus.value = newStatus.code; // 更新状态码
        console.log("二维码状态:", qrStatus.value);

        switch (qrStatus.value) {
          case 800:
            console.log("二维码已过期");
            clearInterval(interval); // 停止轮询
            break;
          case 801:
            console.log("等待扫码...");
            break;
          case 802:
            console.log("待确认...");
            break;
          case 803:
            console.log("授权登录成功，返回 cookies:", newStatus.cookie);
            clearInterval(interval); // 停止轮询
            // TODO: 处理登录成功后的逻辑
            break;
          case 502:
            console.log("扫码失败，尝试无 Cookie 方式登录");
            const noCookieStatus = await checkQRCodeStatus(key, true);
            if (noCookieStatus && noCookieStatus.code === 803) {
              console.log(
                "授权登录成功（无 Cookie 方式）:",
                noCookieStatus.cookie
              );
              clearInterval(interval);
              // TODO: 处理登录成功后的逻辑
            }
            break;
          default:
            console.log("未知状态:", qrStatus.value);
        }
      }
    }, 5000); // 每 5 秒检查一次状态
  } else {
    console.error("二维码数据获取失败");
  }
});
</script>
