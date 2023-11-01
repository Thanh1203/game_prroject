import dataEles from "./dataEles.json";

const Elesdata = dataEles.dataElements;

function getEleKey(data: string[]) {
  let result: {key?: string[], name?: string, img?: string} = {};
  Elesdata.forEach((element) => {
    if (handleCheck(element.key, data)) {
      result = element;
    }
  });
  return result;
}

function handleCheck(itemKey:string[], data:string[]) {
  return itemKey.every((ele) => data.includes(ele));
}

export default function handlerule(data: string[]) {
  const result = getEleKey(data);
  return result;
}
