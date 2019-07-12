"use strict";

var _pagesStructure = require("./pagesStructure");

test('pagesStructure -- findDescendants should return array of items descedant to the id', function () {
  expect((0, _pagesStructure.findDescendants)([{
    id: 'page_4',
    path: ['page_3']
  }, {
    id: 'page_5',
    path: ['page_4']
  }, {
    id: 'page_6',
    path: ['page_4', 'page_5']
  }, {
    id: 'page_7',
    path: ['page_3']
  }, {
    id: 'page_8',
    path: ['page_4']
  }, {
    id: 'page_9',
    path: ['page_34', 'page_40', 'page_4']
  }], 'page_4')).toEqual([{
    id: 'page_5',
    path: ['page_4']
  }, {
    id: 'page_6',
    path: ['page_4', 'page_5']
  }, {
    id: 'page_8',
    path: ['page_4']
  }, {
    id: 'page_9',
    path: ['page_34', 'page_40', 'page_4']
  }]);
});
//# sourceMappingURL=pagesStructure.test.js.map