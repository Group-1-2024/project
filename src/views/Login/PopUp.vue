<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg text-center w-[90%] max-w-md">
      <h2 class="text-2xl font-bold mb-4">服务条款和隐私政策提示</h2>
      <p class="mb-6 mr-[35%]">欢迎使用网易云音乐！<br /></p>
      <p class="mb-6 ml-[10px]">
        在您使用网易云音乐前，请您认真阅读并了解<a
          href="#"
          class="text-blue-500 hover:underline"
          >《服务条款》</a
        >和<a href="#" class="text-blue-500 hover:underline">《隐私政策》</a>。
      </p>
      <p class="mb-6">
        如您未满14周岁，您还需要通知您的监护人共同阅读<a
          href="#"
          class="text-blue-500 hover:underline"
          >《儿童隐私政策》</a
        >，点击"同意"即表示您和您的监护人已阅读并同意全部条款
      </p>
      <button
        @click="agree"
        class="w-[100%] bg-red-600 text-white py-2 px-4 rounded-full transition"
      >
        同意
      </button>
      <a href="#" @click="exit" class="block mt-4 text-blue-500 hover:underline"
        >不同意并退出APP>></a
      >
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const showPopup = ref(true); // 控制弹窗显示
const emit = defineEmits(["agree", "exit"]); // 声明事件

const agree = () => {
  showPopup.value = false; // 同意后隐藏弹窗
  emit("agree"); // 向父组件触发 agree 事件
};

const exit = () => {
  emit("exit"); // 向父组件触发 exit 事件
};
</script>
