import { createApp } from "vue";
import App from "./App.vue";
//* router
import router from "./Router/router";
//* css
import "./CSS/base.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
//* icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
//*store
import store from "./Store/store";

const app = createApp(App);
library.add(fas);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);

app.mount("#app");
