import TopMv from "@/views/TopList/TopMv.vue";
import HomePage from "@/views/Home/HomePage.vue";
import SongList from "@/views/Home/children/SongList.vue";

export default [
  { path: "/", component: HomePage },
  { path: "/topMv", component: TopMv },
  { path: "/home", component: HomePage },
  { path: "/SongList", component: SongList },
];
