import { createStore } from "vuex";

const store = createStore({
  state: {
    natureElements: [
      {
        name: "air",
        img: "air.png",
      },
      {
        name: "earth",
        img: "earth.png",
      },
      {
        name: "fire",
        img: "fire.png",
      },
      {
        name: "water",
        img: "water.png",
      },
    ],
  },
  getters: {
    natureElements: (state) => state.natureElements,
  },
});

export default store;
