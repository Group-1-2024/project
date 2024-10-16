<!-- 封装input框 -->
<template>
  <div class=" inline-block w-[180px] text-[14px] relative">
    <!-- :placeholder="attrs.placeholder"
    :type="attrs.type"
    :a="1"
    :b="2"
    v-bind="{a:1,b:2}"
    -->
    <input
      v-bind="attrs"
      :value="props.value"
      @input="(e) => emit('update:value', e.target.value)"
      class="w-[100%] px-[15px] h-[40px] leading-[40px] text-[#606266] box-border
      rounded-[4px] bg-white border outline-none"

    />
  </div>
</template>

<script setup>
import { useAttrs, defineEmits, defineProps } from "vue";

const props = defineProps({
  value: String,
});
const emit = defineEmits(["update:value"]);
const attrs = useAttrs();
console.log(attrs);
</script>
