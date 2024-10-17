<template>
  <div>
    <div
      class="h-[90vw] transition-all duration-20 0 relative bg-gradient-to-br from-[#486D8D] to-[#6186AB] pb-[5vw] pl-[3.9vw] pr-[3.4vw] pt-[13.5vw]"
      :style="{ background: randomColor() }"
    >
      <nav
        class="a2 pl-[3.9vw] pr-[3.4vw] h-[13.5vw] flex items-center justify-between"
      >
        <div class="flex items-center">
          <Icon
            icon="bx:arrow-back"
            width="24"
            height="24"
            style="color: #fff"
            @click="backToHome"
          />
          <div
            class="w-[42vw] h-[13.5vw] flex items-center overflow-hidden relative"
          >
            <div class="text-[4.2vw] text-[#fff] ml-[4.7vw] relative">歌单</div>
          </div>
        </div>
        <div class="flex items-center">
          <Icon
            icon="ion:search-sharp"
            width="24"
            height="24"
            style="color: #fff"
            class="mr-[5vw]"
          />

          <Icon
            icon="charm:menu-kebab"
            width="24"
            height="24"
            style="color: #fff"
          />
        </div>
      </nav>
      <!-- 中间整体盒子 -->
      <div>
        <button @click="toggleContent" class="btn3">
          <svg
            v-if="!isCircleShown"
            width="24"
            height="24"
            fill="none"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M1 7v4m0 4v4m0-8h4m-4 4h4"
            />
          </svg>
          <svg
            v-else
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        </button>
        <transition name="fade" duration="1">
          <div v-if="isCircleShown">
            <!-- 当前内容 -->
            <div class="transition-all fade-in">
              <section class="h-[29vw] flex pt-[2.6vw] justify-between">
                <div class="w-[24vw] h-[25vw] pt-[1vw] relative">
                  <img
                    :src="SongListDetail.data.playlist.coverImgUrl"
                    class="w-[24vw] h-[24vw] rounded-[10px] relative z-[2]"
                  />
                  <!-- 图片 -->
                  <div
                    class="w-[20vw] h-[10vw] bg-opacity-20 bg-[#fff] absolute top-0 left-1/2 -translate-x-1/2 rounded-[6px] z-[1]"
                  ></div>
                  <div
                    class="absolute top-0 left-0 pr-[1.4vw] pt-[2vw] justify-end font-[800] text-[#fff] flex items-center w-[24vw] z-[2] transform scale-80"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="10"
                      height="10"
                      viewBox="0 0 512 512"
                      class="text-[#fff] w-[3vw] h-[3vw] iconify iconify--ion"
                    >
                      <path
                        fill="currentColor"
                        d="M133 440a35.37 35.37 0 0 1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0 1 35.77.45l247.85 148.36a36 36 0 0 1 0 61l-247.89 148.4A35.5 35.5 0 0 1 133 440"
                      ></path>
                    </svg>
                    <span data-v-32bd4a63="" class="font-[800] text-[1.5vw]">{{
                      formatNum(SongListDetail.data.playlist.playCount)
                    }}</span>
                  </div>
                </div>
                <div class="w-[67vw] pr-[12vw]">
                  <p
                    class="text-[#fff] text-[3.6vw] leading-[4.9vw] font-[800]"
                  >
                    {{ SongListDetail.data.playlist.name }}
                  </p>
                  <div class="h-[10.5vw] flex items-center">
                    <img
                      class="w-[6vw] h-[6vw] rounded-[50%]"
                      :src="SongListDetail.data.playlist.creator.avatarUrl"
                    />
                    <span
                      class="text-[2.73vw] ml-[2vw] mr-[1.5vw] text-[#fff] opacity-50"
                    >
                      {{ SongListDetail.data.playlist.creator.nickname }}</span
                    >
                    <span
                      class="px-[2vw] py-[1.25vw] rounded-[50px] text-[2.2vw] text-[#fff] opacity-50 bg-opacity-20 bg-[#fff] flex items-center pr-[3.5vw]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        class="text-[4vw] text-[#fff] iconify iconify--material-symbols"
                      >
                        <path
                          fill="currentColor"
                          d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                        ></path>
                      </svg>
                      关注
                    </span>
                  </div>
                  <div data-v-32bd4a63="" class="flex">
                    <div
                      v-if="SongListDetail.data.playlist.tags[0]"
                      data-v-32bd4a63=""
                      class="flex items-center justify-center pl-[2.5vw] pr-[1.5vw] py-[0.7vw] bg-opacity-20 bg-[#fff] text-[#fff] rounded-[4px] mr-[1.4vw]"
                    >
                      <span data-v-32bd4a63="" class="text-[2.2vw]">{{
                        SongListDetail.data.playlist.tags[0]
                      }}</span>
                      <svg
                        data-v-32bd4a63=""
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        viewBox="0 0 1024 1024"
                        class="text-[3vw] ml-[0.6vw] iconify iconify--ep"
                        style="color: white"
                      >
                        <g transform="rotate(90 512 512)">
                          <path
                            fill="currentColor"
                            d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div
                      v-if="SongListDetail.data.playlist.tags[1]"
                      data-v-32bd4a63=""
                      class="flex items-center justify-center pl-[2.5vw] pr-[1.5vw] py-[0.7vw] bg-opacity-20 bg-[#fff] text-[#fff] rounded-[4px] mr-[1.4vw]"
                    >
                      <span data-v-32bd4a63="" class="text-[2.2vw]">{{
                        SongListDetail.data.playlist.tags[1]
                      }}</span>
                      <svg
                        data-v-32bd4a63=""
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        viewBox="0 0 1024 1024"
                        class="text-[3vw] ml-[0.6vw] iconify iconify--ep"
                        style="color: white"
                      >
                        <g transform="rotate(90 512 512)">
                          <path
                            fill="currentColor"
                            d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div
                      v-if="SongListDetail.data.playlist.tags[2]"
                      class="flex items-center justify-center pl-[2.5vw] pr-[1.5vw] py-[0.7vw] bg-opacity-20 bg-[#fff] text-[#fff] rounded-[4px] mr-[1.4vw]"
                    >
                      <span class="text-[2.2vw]">{{
                        SongListDetail.data.playlist.tags[2]
                      }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        viewBox="0 0 1024 1024"
                        class="text-[3vw] ml-[0.6vw] iconify iconify--ep"
                        style="color: white"
                      >
                        <g transform="rotate(90 512 512)">
                          <path
                            fill="currentColor"
                            d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </section>
              <p
                class="h-[4vw] flex items-center w-[90vw] overflow-hidden mt-[3.8vw] justify-between"
              >
                <span
                  class="text-[#fff] opacity-50 text-[2.8vw] whitespace-nowrap w-[83vw] overflow-hidden"
                  >{{ SongListDetail.data.playlist.description }}</span
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  viewBox="0 0 1024 1024"
                  class="text-[3vw] iconify iconify--ep"
                  style="color: rgb(216, 228, 245)"
                >
                  <g transform="rotate(90 512 512)">
                    <path
                      fill="currentColor"
                      d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"
                    ></path>
                  </g>
                </svg>
              </p>
            </div>
          </div>
          <div v-else>
            <!-- 点击之后变化的内容 -->
            <div class="fade-in" style="">
              <div
                class="h-[10vw] flex items-center text-[#fff] opacity-50 text-[3vw]"
              >
                喜欢这个歌单的用户也听了
              </div>
              <div class="w-[95vw] scroll-wrapper overflow-hidden">
                <div class="flex w-[160vw]">
                  <div class="w-[28vw] mr-[2.5vw]">
                    <div
                      class="w-[28vw] h-[28vw] rounded-[8px] overflow-hidden relative pt-[1vw]"
                    >
                      <img
                        src="http://p1.music.126.net/4iVtljjCsCjYuitfkVIKFg==/3262251001281759.jpg"
                        alt=""
                        class="w-[28vw] h-[28vw] rounded-[8px] relative z-[1]"
                      />
                      <div
                        class="dark:bg-[#272727] w-[26vw] h-[28vw] bg-opacity-20 bg-[#fff] absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[0]"
                      ></div>
                    </div>
                    <p
                      class="dark:text-[#e3e5ec] text-[2.78vw] text-[#fff] mt-[2vw] scroll-item"
                    >
                      华语经典丨情歌还是老的好
                    </p>
                  </div>
                  <div class="w-[28vw] mr-[2.5vw]">
                    <div
                      class="w-[28vw] h-[28vw] rounded-[8px] overflow-hidden relative pt-[1vw]"
                    >
                      <img
                        src="http://p1.music.126.net/gIN9NPitgatKA9PtBSdibg==/109951164204978529.jpg"
                        alt=""
                        class="w-[28vw] h-[28vw] rounded-[8px] relative z-[1]"
                      />
                      <div
                        class="dark:bg-[#272727] w-[26vw] h-[28vw] bg-opacity-20 bg-[#fff] absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[0]"
                      ></div>
                    </div>
                    <p
                      class="dark:text-[#e3e5ec] text-[2.78vw] text-[#fff] mt-[2vw] scroll-item"
                    >
                      初识不知曲中意，再听已是曲中人
                    </p>
                  </div>
                  <div class="w-[28vw] mr-[2.5vw]">
                    <div
                      class="w-[28vw] h-[28vw] rounded-[8px] overflow-hidden relative pt-[1vw]"
                    >
                      <img
                        src="http://p1.music.126.net/z5SfO8HA_lnbVlhqbTfMCg==/109951169722371582.jpg"
                        alt=""
                        class="w-[28vw] h-[28vw] rounded-[8px] relative z-[1]"
                      />
                      <div
                        class="dark:bg-[#272727] w-[26vw] h-[28vw] bg-opacity-20 bg-[#fff] absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[0]"
                      ></div>
                    </div>
                    <p
                      class="dark:text-[#e3e5ec] text-[2.78vw] text-[#fff] mt-[2vw] scroll-item"
                    >
                      2024全网最火超好听热门歌曲
                    </p>
                  </div>
                  <div class="w-[28vw] mr-[2.5vw]">
                    <div
                      class="w-[28vw] h-[28vw] rounded-[8px] overflow-hidden relative pt-[1vw]"
                    >
                      <img
                        src="http://p1.music.126.net/pa1t9G_Mt2xJm_xqUUjvIw==/109951163676905233.jpg"
                        alt=""
                        class="w-[28vw] h-[28vw] rounded-[8px] relative z-[1]"
                      />
                      <div
                        class="dark:bg-[#272727] w-[26vw] h-[28vw] bg-opacity-20 bg-[#fff] absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[0]"
                      ></div>
                    </div>
                    <p
                      class="dark:text-[#e3e5ec] text-[2.78vw] text-[#fff] mt-[2vw] scroll-item"
                    >
                      歌词唱透了心声，回忆模糊了眼眸
                    </p>
                  </div>
                  <div class="w-[28vw] mr-[2.5vw]">
                    <div
                      class="w-[28vw] h-[28vw] rounded-[8px] overflow-hidden relative pt-[1vw]"
                    >
                      <img
                        src="http://p1.music.126.net/P8w0xreTcXV-GAUcx6Axjg==/109951163216834301.jpg"
                        alt=""
                        class="w-[28vw] h-[28vw] rounded-[8px] relative z-[1]"
                      />
                      <div
                        class="dark:bg-[#272727] w-[26vw] h-[28vw] bg-opacity-20 bg-[#fff] absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[0]"
                      ></div>
                    </div>
                    <p
                      class="dark:text-[#e3e5ec] text-[2.78vw] text-[#fff] mt-[2vw] scroll-item"
                    >
                      熬夜和想你，我都该戒掉了
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- ↑中间整体盒子 -->
      <div class="flex items-center mt-[3.5vw]">
        <div
          class="flex items-center justify-center h-[9.9vw] rounded-[200px] bg-opacity-20 bg-[#fff] font-[800] flex-1 text-[#f8fefe] text-[3vw]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            class="text-[5vw] mr-[1.8vw] iconify iconify--majesticons"
            style="color: white"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m20 12l-6.4-7v3.5C10.4 8.5 4 10.6 4 19c0-1.167 1.92-3.5 9.6-3.5V19z"
            ></path>
          </svg>
          <ForWard></ForWard>
          <p class="Ppp1">
            {{ formatNum(SongListDetail.data.playlist.shareCount) }}
          </p>
        </div>
        <div
          class="flex items-center justify-center h-[9.9vw] rounded-[200px] bg-opacity-20 bg-[#fff] font-[800] flex-1 mx-[3vw] text-[#f8fefe] text-[3vw]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            viewBox="0 0 1024 1024"
            class="text-[5vw] mr-[1.8vw] iconify iconify--ant-design"
            style="color: white"
          >
            <path
              fill="currentColor"
              d="M924.3 338.4a447.6 447.6 0 0 0-96.1-143.3a443.1 443.1 0 0 0-143-96.3A443.9 443.9 0 0 0 512 64h-2c-60.5.3-119 12.3-174.1 35.9a444.1 444.1 0 0 0-141.7 96.5a445 445 0 0 0-95 142.8A449.9 449.9 0 0 0 65 514.1c.3 69.4 16.9 138.3 47.9 199.9v152c0 25.4 20.6 46 45.9 46h151.8a447.7 447.7 0 0 0 199.5 48h2.1c59.8 0 117.7-11.6 172.3-34.3A443.2 443.2 0 0 0 827 830.5c41.2-40.9 73.6-88.7 96.3-142c23.5-55.2 35.5-113.9 35.8-174.5c.2-60.9-11.6-120-34.8-175.6M312.4 560c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.4 48-47.9 48m199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.5 48-47.9 48m199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.5 48-47.9 48"
            ></path>
          </svg>
          <ComMents></ComMents>
          <p class="Ppp1">
            {{ formatNum(SongListDetail.data.playlist.commentCount) }}
          </p>
        </div>
        <div
          class="flex items-center justify-center h-[9.9vw] rounded-[200px] bg-[#ff2658] font-[800] flex-1 text-[#f8fefe] text-[3vw]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            class="text-[5vw] mr-[1.8vw] iconify iconify--mdi"
            style="color: white"
          >
            <path
              fill="currentColor"
              d="m5.8 21l1.6-7L2 9.2l7.2-.6L12 2l2.8 6.6l7.2.6l-3.2 2.8H18c-3.1 0-5.6 2.3-6 5.3zM17 14v3h-3v2h3v3h2v-3h3v-2h-3v-3z"
            ></path>
          </svg>
          {{ formatNum(SongListDetail.data.playlist.subscribedCount) }}
        </div>
      </div>
    </div>
  </div>

  <div
    class="bg-[#fff] w-[100vw] rounded-[15px] relative z-[1] mt-[-2.5vw] px-[3.8vw]"
  >
    <nav class="a1 h-[13vw] flex items-center justify-between">
      <div class="flex items-center">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          class="text-[#ED3E20] text-[8vw] iconify iconify--heroicons-solid"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16M9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="text-[#25272C] text-[3.7vw] ml-[3.9vw] mr-[2.3vw]"
          >播放全部</span
        >
        <span class="text-[#8C9094] text-[2.7vw]">(35)</span>
      </div>
      <div>
        <svg
          viewBox="0 0 36 36"
          class="text-[5vw] text-[#2C3034] iconify iconify--clarity"
        >
          <path class="clr-i-outline clr-i-outline-path-1"></path>
          <path class="clr-i-outline clr-i-outline-path-2"></path>
          <path fill="none" d="M0 0h36v36H0z"></path>
        </svg>
        <svg
          viewBox="0 0 24 24"
          class="text-[6vw] text-[#2C3034] ml-[5vw] mt-[1vw] iconify iconify--solar"
        >
          <path fill="none" d="M0 0h36v36H0z"></path>
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M2 5.75A.75.75 0 0 1 2.75 5h18a.75.75 0 0 1 0 1.5h-18A.75.75 0 0 1 2 5.75m0 4A.75.75 0 0 1 2.75 9h18a.75.75 0 0 1 0 1.5h-18A.75.75 0 0 1 2 9.75m18.211 2.909a.75.75 0 0 1 .13 1.052l-3.9 5a.75.75 0 0 1-1.165.021l-2.1-2.5a.75.75 0 1 1 1.148-.964l1.504 1.79l3.33-4.27a.75.75 0 0 1 1.053-.13M2 13.75a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </nav>
    <div>
      <div
        class="flex items-center h-[14vw]"
        v-for="(item, index) in SongListTrack.data.songs"
        :key="index"
      >
        <div
          data-v-32bd4a63
          class="w-[4vw] text-[#bfbfbf] text-[3vw] text-center mr-[3.52vw] font-medium"
        >
          {{ index + 1 }}
        </div>
        <div
          class="w-[4vw] text-[#bfbfbf] text-[3vw] text-center mr-[3.52vw] flex items-center justify-center"
        >
          <img src="" class="red-image w-[2vw] h-[2vw]" />
        </div>
        <div class="font-medium text-[3.6vw] w-[64vw]">
          <div
            class="text-[3.6vw] text-ellipsis overflow-hidden whitespace-nowrap w-[50vw] text-[#949797]"
          >
            <span class="text-ellipsis text-[#000]">{{ item.name }}</span>
            <!---->
          </div>
          <div
            class="w-[64vw] text-ellipsis overflow-hidden whitespace-nowrap text-[#808080] text-[2.8vw] flex items-center"
          >
            <span
              class="w-[8.5vw] h-[6vw] rounded-[3px] border-[1px] border-[red] font-[800] text-[3vw] text-[red] text-center leading-[6vw] scale-50 ml-[-2vw] mr-[-1vw]"
              >vip</span
            >
            <span
              class="w-[8.5vw] h-[6vw] rounded-[3px] border-[1px] border-[#60BDEF] text-[3vw] text-[#60BDEF] text-center leading-[6vw] scale-50 ml-[-2vw] mr-[-1vw]"
              >试听</span
            >
            <span>{{ item.ar[0].name }}-{{ item.name }}</span>
          </div>
        </div>
        <svg
          viewBox="0 0 48 48"
          class="ml-[4.6vw] text-[6vw] text-[#B3B3B3] mt-[-2vw] iconify iconify--arcticons"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M24 5.5C39 5.5 42.5 9 42.5 24S39 42.5 24 42.5S5.5 39 5.5 24S9 5.5 24 5.5"
          ></path>
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.77 24c0-10.376-.264-10.224 8.723-5.036s8.986 4.884 0 10.072S16.77 34.376 16.77 24"
          ></path>
        </svg>
        <svg
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          class="ml-[4.6vw] text-[5vw] text-[#B3B3B3] mt-[-2vw] iconify iconify--ri"
        >
          <path
            fill="currentColor"
            d="M12 3c-.825 0-1.5.675-1.5 1.5S11.175 6 12 6s1.5-.675 1.5-1.5S12.825 3 12 3m0 15c-.825 0-1.5.675-1.5 1.5S11.175 21 12 21s1.5-.675 1.5-1.5S12.825 18 12 18m0-7.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5s1.5-.675 1.5-1.5s-.675-1.5-1.5-1.5"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { useRequest } from "vue-request";

import {
  getPlaylistDetail,
  getPlaylistTrackAll,
  getRelatedPlaylist,
} from "../../../api";

import ForWard from "./Attachment/ForWard.vue";
import ComMents from "./Attachment/ComMents.vue";

const isCircleShown = ref(true);

function formatNum(number) {
  if (number < 10000) {
    return number.toString(); // 不足五位数，直接返回
  }
  if (number < 100000000 && number >= 10000) {
    const wan = Math.round(number / 10000).toString();
    return `${wan}万`;
  }
  const yi = Math.round(number / 100000000).toString();
  return `${yi}亿`;
}

function toggleContent() {
  isCircleShown.value = !isCircleShown.value;
}
const router = useRouter();
function backToHome() {
  router.push("/home");
}

const SongListid = ref(router.currentRoute.value.query.id);
// 歌单
const { data: SongListTrack } = useRequest(
  () =>
    getPlaylistTrackAll({
      id: SongListid.value,
    }),
  {
    refreshDeps: SongListid,
  }
);
const { data: SongListDetail } = useRequest(
  () =>
    getPlaylistDetail({
      id: SongListid.value,
    }),
  {
    refreshDeps: SongListid,
  }
);

const { data: RelatedSongList } = useRequest(
  () =>
    getRelatedPlaylist({
      id: SongListid.value,
    }),
  {
    refreshDeps: SongListid,
  }
);
watchEffect(() => {});
console.log(SongListTrack);
console.log(SongListDetail);
console.log(RelatedSongList);

function randomColor() {
  const r = Math.floor(Math.random() * 256); // 生成0-255的随机数
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`; // 返回rgb颜色格式
}
</script>
<style scoped>
.a2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
button {
  border: none;
  background: none;
  cursor: pointer;
}

svg {
  fill: currentColor;
}

/* 定义过渡动画的关键帧 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.btn3 {
  position: relative;
  top: 1px;
  left: 80vw;
}
.Ppp1 {
  position: relative;
  left: -20px;
}

/* 根据需要添加更多样式 */
</style>
