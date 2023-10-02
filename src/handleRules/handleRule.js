import dataEles from "./dataEles.json";

const Elesdata = dataEles.dataElements;

function getEleKey(data) {
  let result;
  Elesdata.forEach((element) => {
    if (element.key.length == data.length && handleCheck(element.key, data)) {
      result = element;
    }
  });
  return result;
}

function handleCheck(itemKey, data) {
  return itemKey.every((ele) => data.includes(ele));
}

export default function handlerule(data) {
  const result = getEleKey(data);
  return result;
}
