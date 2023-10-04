import {
  NATURE_ELEMENTS,
  COMBINE_NATURE,
  defaultData,
} from "@/contant/keyLocalStorage";

export default {
  getNatureEle() {
    return JSON.parse(localStorage.getItem(NATURE_ELEMENTS)) || defaultData;
  },
  setNatureEle(data) {
    localStorage.setItem(NATURE_ELEMENTS, JSON.stringify(data));
  },
  getCombineNatureEle() {
    return JSON.parse(localStorage.getItem(COMBINE_NATURE)) || [];
  },
  setCombineNatureEle(data) {
    localStorage.setItem(COMBINE_NATURE, JSON.stringify(data));
  },
};
