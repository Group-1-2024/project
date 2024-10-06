<template>
  <div>
    <div class="flex justify-between items-center h-[12vw]">
      <div
        @click="emit('clickTitle')"
        class="text-[#3e4659] font-bold pl-[4vw]"
      >
        {{ props.title }}
      </div>
      <Icon
        @click="emit('clickMore')"
        icon="ri:more-2-fill"
        class="text-[4vw] text-[#9195a1] mr-[3vw]"
      />
    </div>
    <slot />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
});

const emit = defineEmits(["clickMore", "clickTitle"]);
</script>
