// @ts-nocheck
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "vue-query";

import mitt from "mitt";

const emitter = mitt();

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);

app.provide("emitter", emitter); // ✅ Provide as `emitter`

app.mount("#app");
