// import TopMv from "@/views/TopList/TopMv.vue";
// import HomePage from "@/views/Home/HomePage.vue";
// import SongList from "@/views/Home/children/SongList.vue";
import IndexLogin from "@/views/Login/IndexLogin.vue";
import PhoneLogin from "@/views/Login/PhoneLogin.vue";
import ConfirmPassword from "@/views/Login/ConfirmPassword.vue";
import VisitorLogin from "@/views/Login/VisitorLogin.vue";
import LoginPage from "@/views/Login/LoginPage.vue";
import EmailLogin from "@/views/Login/EmailLogin.vue";

export default [
  { path: "/", redirect: "/home" },
  {
    path: "/QRlogin",
    component: () => import("@/views/Login/QRLoginPage.vue"),
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/indexlogin",
    component: IndexLogin,
  },
  {
    path: "/phonelogin",
    component: PhoneLogin,
  },
  {
    path: "/confirmpassword",
    component: ConfirmPassword,
  },

  {
    path: "/visitorlogin",
    component: VisitorLogin,
  },
  {
    path: "/emailLogin",
    component: EmailLogin,
  },
  { path: "/home", component: () => import("@/views/Home/HomePage.vue") },
  { path: "/topMv", component: () => import("@/views/TopList/TopMv.vue") },
  {
    path: "/SongList",
    component: () => import("@/views/Home/children/SongList.vue"),
  },
  {
    path: "/mycenter",
    component: () => import("@/views/MyCenter/MyCenter.vue"),
  },
];
