"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

function _default(app) {
  app.use((0, _helmet["default"])());
  app.use((0, _compression["default"])());
}
//# sourceMappingURL=prod.js.map