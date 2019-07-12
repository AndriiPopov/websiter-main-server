"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findDescendants = void 0;

var findDescendants = function findDescendants(items, id) {
  return items.filter(function (item) {
    return item.path.some(function (element) {
      return element.toString() === id.toString();
    });
  });
};

exports.findDescendants = findDescendants;
//# sourceMappingURL=pagesStructure.js.map