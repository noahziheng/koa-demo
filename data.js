const fs = require('fs');

const dataFilePath = './data.json';

module.exports = {
  getList: () => {
    const jsonStr = fs.readFileSync(dataFilePath);
    return JSON.parse(jsonStr);
  },
  getItem: (i) => {
    const jsonStr = fs.readFileSync(dataFilePath);
    const list = JSON.parse(jsonStr);
    return list[i];
  },
  createItem: (item) => {
    const jsonStr = fs.readFileSync(dataFilePath);
    const list = JSON.parse(jsonStr);
    list.push(item);
    return fs.writeFileSync(dataFilePath, JSON.stringify(list));
  },
  updateItem: (i, item) => {
    const jsonStr = fs.readFileSync(dataFilePath);
    const list = JSON.parse(jsonStr);
    list[i] = item;
    return fs.writeFileSync(dataFilePath, JSON.stringify(list));
  },
  removeItem: (i) => {
    const jsonStr = fs.readFileSync(dataFilePath);
    const list = JSON.parse(jsonStr);
    list.splice(i, 1);
    return fs.writeFileSync(dataFilePath, JSON.stringify(list));
  }
};
