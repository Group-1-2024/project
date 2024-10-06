<template>
  <div class="flex items-center justify-between mb-[4vw] pt-[4vw]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="size-[8vw] rotate-90 font-thin"
    >
      <path
        fill="black"
        d="M6.5 20q-.625 0-1.062-.437T5 18.5v-3q0-.625.438-1.062T6.5 14t1.063.438T8 15.5v3q0 .625-.437 1.063T6.5 20m6 0q-.625 0-1.062-.437T11 18.5v-8q0-.625.438-1.062T12.5 9t1.063.438T14 10.5v8q0 .625-.437 1.063T12.5 20m6 0q-.625 0-1.062-.437T17 18.5v-13q0-.625.438-1.062T18.5 4t1.063.438T20 5.5v13q0 .625-.437 1.063T18.5 20"
      />
    </svg>

    <div class="relative">
      <label for="">
        <input
          type="text"
          class="dark:from-[#34304b] dark:to-[#403246] dark:border-0 text-[4vw] pl-[8vw] bg-gradient-to-r from-[#d9ddfd] text-[#8189A1] to-[#f3d9ef] opacity-0.2 w-[75vw] h-[10vw] border-2 border-[#CCCEF7] rounded-[25px]"
          placeholder="❤离别开出花-就是南方..."
        />
        <svg
          class="absolute left-[2.5vw] top-[2vw] w-[6vw] h-[6vw] text-[#8189A1] iconify iconify--tabler"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 50 50"
        >
          <path
            fill="gray"
            d="M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13s13 5.8 13 13s-5.8 13-13 13m0-24c-6.1 0-11 4.9-11 11s4.9 11 11 11s11-4.9 11-11s-4.9-11-11-11"
          />
          <path
            fill="gray"
            d="m32.682 31.267l8.98 8.98l-1.414 1.414l-8.98-8.98z"
          />
        </svg>
        <svg
          class="absolute right-[4vw] top-[2.5vw] w-[5vw] h-[5vw] text-[#8189A1] iconify iconify--tabler"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="grey"
            d="M15 3h6v5h-2V5h-4zM9 3v2H5v3H3V3zm6 18v-2h4v-3h2v5zm-6 0H3v-5h2v3h4zM3 11h18v2H3z"
          />
        </svg>
      </label>
    </div>

    <Icon
      icon="uil:microphone"
      width="25"
      height="25"
      style="color: black; float: right"
    />
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
</script>
