const NATURE_ELEMENTS = "NATURE_ELEMENTS";
const COMBINE_NATURE = "COMBINE_NATURE";
const defaultData = [
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
];

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
