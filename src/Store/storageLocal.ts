import {
  NATURE_ELEMENTS,
  COMBINE_NATURE,
  defaultData,
} from "@/contant/keyLocalStorage";

export default {
  getNatureEle() {
    const storeData = localStorage.getItem(NATURE_ELEMENTS)
    const parsedData = storeData ? JSON.parse(storeData) : defaultData
    return parsedData
  },
  setNatureEle(data : any) {
    localStorage.setItem(NATURE_ELEMENTS, JSON.stringify(data));
  },
  getCombineNatureEle() {
    const storeData = localStorage.getItem(COMBINE_NATURE)
    const parsedData = storeData ? JSON.parse(storeData) : []
    return parsedData
  },
  setCombineNatureEle(data: any) {
    localStorage.setItem(COMBINE_NATURE, JSON.stringify(data));
  },
};
