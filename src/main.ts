import App from "./App.vue";

import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";

import { Quasar } from "quasar";
import quasarConfig from "./configs/quasar";

const app = createApp(App);
app.use(createPinia());
app.use(Quasar, quasarConfig);
app.use(router);
app.mount("#app");
