<template>
  <div>
    <!-- 返回按钮和标题 -->
    <div class="flex items-center justify-start ml-[20px] mt-[20px]">
      <Icon
        @click="router.back()"
        icon="ph:arrow-left"
        width="24"
        height="24"
        style="color: black"
      />
      <p class="ml-[20px] font-bold">手机号登录</p>
    </div>
    <!-- 提示信息 -->
    <div>
      <p class="text-[#9f9f9f] ml-[22px] mt-[30px] text-[10px]">
        未注册的手机号登录后将自动创建账号
      </p>
    </div>
    <!-- 国家/地区选择和手机号输入框 -->
    <div class="flex items-center justify-between ml-[22px] mt-[30px]">
      <select id="countryCode">
        <option value="+86">+86</option>
        <!-- 其他国家/地区 -->
      </select>
      <van-field
        v-model="value"
        readonly
        clickable
        @touchstart.stop="show = true"
      />
      <van-number-keyboard
        v-model="value"
        :show="show"
        :maxlength="11"
        @blur="show = false"
        title="请输入手机号"
      />
      <!-- <input
        type="tel"
        id="phone"
        placeholder="请输入手机号"
        class="border-b-2 border-b-gray-300 block mr-[100px]"
        v-model="megInfo.phone"
      /> -->
    </div>
    <!-- 下一步 -->
    <div>
      <button
        @click="handleNext"
        class="bg-[#ff3a30] text-white w-[90%] h-[40px] rounded-[20px] mt-[40px] ml-[20px]"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { Icon } from "@iconify/vue";

const router = useRouter();
const show = ref(true);
const value = ref("");
// const megInfo = ref({
//   phone: "",
//   password: "",
// });
const handleNext = () => {
  // const phoneInput = document.getElementById("phone");
  const phone = value.value;
  // const countryCode = document.getElementById("countryCode").value;

  // 检查手机号是否为空
  if (!phone) {
    showToast({
      message: "手机号不能为空",
      position: "bottom",
    });
    return;
  }
  // 手机号正则表达式验证
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (phoneRegex.test(phone)) {
    // 合法手机号，跳转到指定页面
    router.push("/confirmpassword");
  } else {
    // 不合法手机号，显示错误信息
    showToast({
      message: "请输入正确的手机号",
      position: "bottom",
    });
  }
};
</script>

<style scoped></style>
