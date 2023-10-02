import { createStore } from "vuex";
import storageLocal from "./storageLocal";

const store = createStore({
  state: {
    natureElements: storageLocal.getNatureEle(),
    combineNature: storageLocal.getCombineNatureEle(),
  },
  getters: {
    getNatureElements: (state) => state.natureElements,
  },
  mutations: {
    insert(state, data) {
      state.natureElements.push(data);
      storageLocal.setNatureEle(state.natureElements);
    },
  },
  actions: {
    insertNature({ commit }, data) {
      commit("insert", data);
    },
  },
});

export default store;
