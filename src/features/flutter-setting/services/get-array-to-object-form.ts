export const getArrayToObjectForm = (
  mapList: { item: string; value: string }[]
) => {
  let objectString = '{';
  mapList.forEach((map, index) => {
    objectString += `"${map.item}": "${map.value}"`;
    if (index < mapList.length - 1) {
      objectString += ',';
    }
  });
  objectString += '}';
  return objectString;
};
