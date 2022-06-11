import { Boss } from "@prisma/client";

export const createTypeList = (arr: Boss[]) => {
  const maps: string[] = [];
  const item: string[] = [];
  const name: string[] = [];

  arr.forEach((data) => {
    if (maps.indexOf(data.map) === -1) {
      maps.push(data.map);
    }
    if (item.indexOf(data.item) === -1) {
      item.push(data.item);
    }
    if (name.indexOf(data.name) === -1) {
      name.push(data.name);
    }
  });
  maps.sort();
  item.sort();
  name.sort();
  return { maps, item, name };
};
