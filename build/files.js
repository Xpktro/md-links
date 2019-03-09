"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

const getFiles = path => new Promise((resolve, reject) => {
  const absolutePath = (0, _path.resolve)(path);
  (0, _fs.stat)(absolutePath, (err, stats) => {
    if (err) {
      return reject(`Invalid path: ${path}`);
    }

    if (stats.isFile()) {
      return resolve(absolutePath);
    } else {
      (0, _fs.readdir)(absolutePath, (err, files) => {
        const absolutePaths = files.map(file => (0, _path.join)(absolutePath, file));
        Promise.all(absolutePaths.map(getFiles)).then(paths => resolve([].concat(...paths)));
      });
    }
  });
});

const getFilesByExtension = (path, extension) => getFiles(path).then(files => files.filter(file => file.endsWith(extension)));

const getMarkdownFiles = path => getFilesByExtension(path, '.md');

var _default = getMarkdownFiles;
exports.default = _default;