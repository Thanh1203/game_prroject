import { createStore } from "vuex";
import storageLocal from "./storageLocal";

const store = createStore({
  state: {
    natureElements: storageLocal.getNatureEle(),
  },
  getters: {
    getNatureElements: (state) => state.natureElements,
  },
  mutations: {
    insert(state, data) {
      state.natureElements.push(data);
      storageLocal.setNatureEle(state.natureElements);
    },
    update(state, data) {
      state.natureElements = data;
    },
  },
  actions: {
    insertNature({ commit }, data) {
      commit("insert", data);
    },
  },
});

export default store;
