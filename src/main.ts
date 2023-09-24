import App from "./App.vue";

import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";

import { Quasar, Notify } from "quasar";
import "@/styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";

import "@/services/debugLogger";

const app = createApp(App);
app.use(createPinia());

app.use(Quasar, {
  plugins: { Notify },
});

app.use(router);
app.mount("body");
