import { createApp } from "vue";
import "@/style.css";
import "vant/lib/index.css";
import { Icon } from "@iconify/vue";
import App from "@/App.vue";
import initErrorHandle from "@/utils/initErrorHandle";
import router from "./router";
import pinia from "./store";

const app = createApp(App);
initErrorHandle();

app.use(router);
app.use(pinia);
app.use(Icon);
app.mount("#app");
