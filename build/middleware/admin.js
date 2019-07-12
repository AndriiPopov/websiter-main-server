"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden
  //if (!req.user.isAdmin) return res.status(403).send('Access denied.');
  next();
};

exports["default"] = _default;
//# sourceMappingURL=admin.js.map