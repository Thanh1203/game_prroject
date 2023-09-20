import { createRouter, createWebHashHistory } from "vue-router";
import StartGameVue from "@/view/StartGame.vue";
import GamePlayVue from "@/view/GamePlay.vue";

const routes = [
  {
    path: "/",
    component: StartGameVue,
  },
  {
    path: "/Play",
    component: GamePlayVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
