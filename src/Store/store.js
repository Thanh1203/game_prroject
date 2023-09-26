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
    natureElesTemp: [],
  },
  getters: {
    getNatureElements: (state) => state.natureElements,
    getNatureElesTemp: (state) => state.natureElesTemp,
  },
  mutations: {
    update(state, data) {
      state.natureElesTemp = data;
    },
    insert(state, data) {
      state.natureElements.push(data);
    },
  },
  actions: {
    updateNature({ commit }, data) {
      commit("update", data);
    },
  },
});

export default store;
