// import TopMv from "@/views/TopList/TopMv.vue";
// import HomePage from "@/views/Home/HomePage.vue";
// import SongList from "@/views/Home/children/SongList.vue";

export default [
  { path: "/", redirect: "/home" },
  {
    path: "/login",
    component: () => import("@/views/Login/LoginPage.vue"),
  },
  { path: "/home", component: () => import("@/views/Home/HomePage.vue") },
  { path: "/topMv", component: () => import("@/views/TopList/TopMv.vue") },
  {
    path: "/SongList",
    component: () => import("@/views/Home/children/SongList.vue"),
  },
];
