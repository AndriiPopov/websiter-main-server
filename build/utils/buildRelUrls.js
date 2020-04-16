"use strict";

module.exports = (structure, page) => structure.map(item => ({ ...item,
  relUrl: item.path.reduce((totalPath, itemId) => totalPath + structure.find(itemInn => itemInn.id === itemId)[page ? 'url' : 'name'] + '/', '') + item[page ? 'url' : 'name']
}));