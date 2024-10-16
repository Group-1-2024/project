<!-- eslint-disable max-len -->
<template>
  <!-- v-model 语法糖  v-model展开写法-->
  <!-- <input type="text" placeholder="手机号" v-model:abc="a" v-model:def="b"/><br> -->
  <!-- <h1>{{ message }}</h1> -->
  <!-- <MyInput placeholder="自定义输入框" v-model:value="message" @update:value="(e) => (message = e)"/> -->
  <!--
    如何实现组件的v-model:key
    组件需要实现key的props属性
    组件需要定义一个update:key事件用来更新绑定key的数据
  -->
  <!-- <MyInput placeholder="自定义输入框" :value="message" @input="e => message = e"/> -->
  <div class="w-[100%] overflow-hidden pt-[100px] box-border">
    <div class="flex items-center justify-center">
      <img class="w-[70vw]" src="/public/logo.fill.svg" alt="" />
    </div>
    <div
      class="w-[100%] h-[100%] bg-[url('https://huamaobizhi.com/appApi/wallpaper/getImages_1_0/?pid=21526&resolution=1000w680h')] rounded-lg"
    >
      <div class="flex flex-col items-center justify-center mt-10">
        <MyInput
          class="mt-1 mr-[12%] w-[250px] "
          placeholder="请输入手机号"
          v-model:value="userInfo.phone"
        /><br />
        <!-- <MyInput class="mt-1 " placeholder="请输入密码" type="password" v-model:value="userInfo.password"/><br> -->
        <MyInput
          class="mt-1 w-[150px] h-[40px] mr-[38%] ml-[10px]"
          placeholder="请输入验证码"
          type="text"
          v-model:value="userInfo.captcha"
        /><br />
        <div>
        <button
          @click="sendCode"
          class=" w-[100px] h-[40px] inline-block bg-slate-100 border-2 border-lightdark
          rounded-mg text-sm text-[#B2B3B5] transform translate-y-[-60px] ml-[54%] rounded-[4px]"
        >
          发送验证码
        </button>
      </div>
      </div>
      <div>
        <button
          class="w-[200px] h-[40px] leading-10 text-center rounded-lg ml-20  bg-[#ff3a30] mb-5 font-bold text-white"
          @click="loginHadler"
        >
          登录
        </button>
      </div>

    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import localforage from "localforage";
import MyInput from "@/components/MyInput.vue";
import { loginByPhone, sendValidCode, checkValidCode } from "@/api";
import { useRouter, useRoute } from "vue-router";
// import { useRequest } from "vue-request";
import { showToast } from "vant";
// import { useUserStore } from "@/store";

// const userStore = useUserStore();

const router = useRouter();
const route = useRoute();
console.log(route.query.originPath);
const userInfo = ref({
  phone: "",
  password: "",
  captcha: "",
});

// const photograph = ref("");
// const { run: sendCode } = useRequest(
//   () => sendValidCode({ phone: userInfo.value.phone }),
//   {
//     manual: true,
//   },
// );
// 发送验证码;
const sendCode = async () => {
  // sendValidCode({ phone: userInfo.value.phone }).then((res) => {
  //   console.log(res);
  // }).catch((err) => {
  //   console.log(err);
  // });
  try {
    await sendValidCode({ phone: userInfo.value.phone });
    showToast("验证码已发送");
  } catch (err) {
    showToast("发送验证码失败");
  }
};

// const { run: loginHadler,data:res } = useRequest(() => loginByPhone(userInfo.value), {
//   manual: true,
// });
watch((res) => {
  console.log(res);
});
// 登录

const loginHadler = async () => {
  // 登录成功拿到数据
  // loginByPhone(userInfo.value)
  //   .then((res) => {
  //     // 登录成功后 保存登录状态(cookie/token) 保存登录账号信息（使用本地存储） 以免登录频繁 会封禁账号
  //     // 跳转到首页
  //     console.log(res);
  //     if (res.data.code === 200) {
  //       localforage
  //         .setItem("userInfo", res.data)
  //         .then(() => {
  //           // 保存用户信息成功跳转到用户想访问的原始页面
  //           router.replace(route.query.originPath);
  //           Notify({ type: "success", message: "您已成功登录" });
  //         })
  //         .catch((err) => {
  //           console.log("保存失败", err);
  //         });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  try {
    // 验证验证码是否正确
    const validRes = await checkValidCode({
      phone: userInfo.value.phone,
      captcha: userInfo.value.captcha,
    });

    // 如果用户输入的验证码和收到的验证码一致，则进行登录
    if (validRes.data.code === 200) {
      const loginRes = await loginByPhone(userInfo.value);
      // 如果登录成功，则保存用户信息并跳转到原始页面或首页
      if (loginRes.data.code === 200) {
        await localforage.setItem("userInfo", loginRes.data);
        showToast("您已成功登录");
        router.replace(route.query.originPath || "/"); // 跳转到原始页面或首页
      }
    } else {
      // 如果验证码不正确，则提示用户重新输入
      showToast("验证码不一致，请重新输入");
    }
  } catch (err) {
    // 如果验证码验证或登录失败，则提示用户检查手机号和验证码
    console.log(err);
    showToast("登录失败，请检查手机号和验证码");
  }
};
// const message = ref("val...");
</script>
