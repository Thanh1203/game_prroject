import dataEles from "./dataEles.json";

const Elesdata = dataEles.dataElements;

function getEleKey(data) {
  let getKey = [];
  let position;
  let result = null;
  Elesdata.forEach((element) => {
    getKey.push(element.key);
  });
  getKey.forEach((item, index) => {
    if (handleCheck(item, data)) {
      position = index;
    }
  });
  Elesdata.forEach((ele, index) => {
    if (index == position) {
      result = ele;
    }
  });
  return result;
}

function handleCheck(itemKey, data) {
  if (itemKey.length !== data.length) {
    return false;
  }
  return itemKey.every((ele) => data.includes(ele));
}

export default function handlerule(data) {
  const result = getEleKey(data);
  return result;
}
