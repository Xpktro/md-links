"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _files = _interopRequireDefault(require("./files"));

var _links = _interopRequireDefault(require("./links"));

var _validation = _interopRequireDefault(require("./validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (path, options = {}) => (0, _files.default)(path).then(_links.default).then(links => options.validate ? (0, _validation.default)(links) : links);

exports.default = _default;