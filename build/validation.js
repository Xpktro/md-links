"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateLink = link => new Promise(resolve => (0, _nodeFetch.default)(link.href).then(response => resolve({ ...link,
  status: response.status,
  ok: response.ok
})).catch(() => resolve({ ...link,
  status: null,
  ok: false
})));

const validate = links => Promise.all(links.map(validateLink));

var _default = validate;
exports.default = _default;