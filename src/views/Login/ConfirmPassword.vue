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
    <!--确认密码 -->
    <div class="mt-[30px] ml-[20px] flex items-center justify-between">
      <input
        type="text"
        id="phone"
        placeholder="请输入密码"
        class="w-[95%] block mr-[100px] mt-[20px]"
        v-model="megInfo.password"
      />
      <!-- @input="validateUserId" -->
      <p class="text-[#007bff] text-[10px] w-[152px] block mt-[30px] ml-[20px]">
        忘记密码?
      </p>
    </div>
    <hr class="w-[95%] ml-[15px] mt-[10px]" />
    <!-- 登录 -->
    <div>
      <button
        @click="handleLogin1"
        class="bg-[#ff3a30] text-white w-[90%] h-[40px] rounded-[20px] mt-[40px] ml-[20px]"
      >
        登录
      </button>
      <!-- <button
        @click="getPassWord"
        class="bg-[#ff3a30] text-white w-[90%] h-[40px] rounded-[20px] mt-[40px] ml-[20px]"
      >
        登录1
      </button>
            <button
        @click="getUserInfo"
        class="bg-[#ff3a30] text-white w-[90%] h-[40px] rounded-[20px] mt-[40px] ml-[20px]"
      >
        登录2
      </button> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { loginByPhone, getUserSubcount } from "@/api";

import localforage from "localforage";

const router = useRouter();
const megInfo = ref({
  phone: "",
  password: "",
});
// const Account information = ref({

// })
// 处理登录操作
const handleLogin1 = () => {
  // 获取用户输入的密码
  // const inputPassword = megInfo.value;
  // 检查 密码 是否为空
  getUserSubcount().then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log("出错了", err);
  });
  if (!megInfo.value.password) {
    showToast("密码不能为空");
  }
  loginByPhone({ password: megInfo.value.password }).then((res) => {
    console.log(res);
    if (res.data.code === 200) {
      localforage
        .setItem("megInfo", {
          password: megInfo.value.password,
        })
        .then(() => {
          localforage
            .getItem("megInfo")
            .then((storedInfo) => {
              // 比较输入的密码和本地存储的密码
              if (storedInfo) {
                // 比较输入密码与本地存储的是否一致
                if (storedInfo.password === megInfo.value.password) {
                  showToast("登录成功");
                  router.replace("/");
                } else {
                  showToast("密码错误，请重新输入");
                }
              } else {
                showToast("没有找到用户信息，请先注册或登录");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("出错了", err);
        });
    }
  });
  // try {
  //   const response = await loginByPhone(inputPassword);
  //   console.log(response);
  //   // 如果返回的code为200，表示登录成功
  //   if (response.data.code === 200) {
  //     // 从响应数据中获取密码
  //     const storedPassword = response.data.megInfo;
  //     // 从本地存储中获取密码
  //     const localPassword = await localforage.getItem("megInfo");
  //     // 比较输入的的密码和本地存储的密码
  //     if (storedPassword === localPassword) {
  //       // 密码匹配，跳转到首页
  //       router.push("/");
  //       showToast("登录成功");
  //     } else {
  //       // 密码不匹配，弹出提示框
  //       showToast("密码错误，请重新输入");
  //     }
  //   } else {
  //     // 处理其他状态码的情况
  //     showToast("登录失败，请检查输入的信息");
  //   }
  // } catch (err) {
  //   showToast("登录过程中出现错误，请稍后重试");
  //   console.log(err);
  // }
};
</script>

<style scoped></style>
