"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const stats = links => {
  const linkStats = links.reduce((result, link) => ({
    unique: result.unique.concat(!~result.unique.indexOf(link.href) ? [link.href] : []),
    broken: result.broken.concat(link.ok !== undefined && !link.ok ? [link] : [])
  }), {
    unique: [],
    broken: []
  });
  return {
    total: links.length,
    unique: linkStats.unique.length,
    broken: linkStats.broken.length
  };
};

var _default = stats;
exports.default = _default;