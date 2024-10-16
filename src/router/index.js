import { createWebHistory, createRouter } from "vue-router";
import localforage from "localforage";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 只有登录页不需要权限访问 其他页面都需要登录在访问
  // 如果去的页面只要不是登录页 那么我们就需要看一下你的权限在不在 如果有权限 则放行 如果没有权限 则跳转到登录页 重新获取权限
  // 去的页面是以/login开头
  if (!to.fullPath.startsWith("/login")) {
    // 如果你不是登录页 但是你已经登陆了 则我们需要获取用户的登录状态
    // showToast("请先登陆");
    localforage
      .getItem("userInfo")
      .then(({ cookie }) => {
        // 如果访问到数据 则我们需要判断cookie是否存在
        if (cookie) {
          next();
        } else {
          next(`/login?originPath=${to.fullPath}`);
        }
      })
      .catch(() => {
        // 如果没有访问到数据
        next(`/login?originPath=${to.fullPath}`);
      });
  } else {
    next();
  }
});

export default router;
