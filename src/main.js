import { createApp } from "vue";
import "@/style.css";
import "vant/lib/index.css";
import { Icon } from "@iconify/vue";
import App from "@/App.vue";
import initErrorHandle from "@/utils/initErrorHandle";
import ElementPlus from "element-plus";
import router from "./router";
import pinia from "./store";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(App);
initErrorHandle();

app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.use(Icon);
app.mount("#app");
