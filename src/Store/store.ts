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
      state.natureElements.sort(function (a:any, b:any) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      storageLocal.setNatureEle(state.natureElements);
    },
    update(state, data) {
      state.natureElements = data;
      storageLocal.setNatureEle(data);
    },
  },
  actions: {
    insertNature({ commit }, data) {
      commit("insert", data);
    },
    updateNature({ commit }, data) {
      commit("update", data);
    },
  },
});

export default store;
