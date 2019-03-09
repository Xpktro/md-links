#!/usr/bin/env node
"use strict";

var _mdLinks = _interopRequireDefault(require("./md-links"));

var _stats = _interopRequireDefault(require("./stats"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  validate: !!~process.argv.indexOf('--validate'),
  stats: !!~process.argv.indexOf('--stats')
};
process.argv[2] ? (0, _mdLinks.default)(process.argv[2], options).then(links => ({
  links,
  stats: options.stats ? (0, _stats.default)(links) : null
})).then(results => {
  if (!options.stats) {
    console.log(results.links.map(link => `${link.file} ${link.line} ${link.href} ${options.validate ? `${link.ok ? 'ok' : 'fail'} ${link.status}` : ''} ${link.text}`).join('\n'));
  } else {
    console.log(`Total: ${results.stats.total}\nUnique: ${results.stats.unique}${options.validate ? `\nBroken: ${results.stats.broken}` : ''}`);
  }
}).catch(console.error) : console.log('USAGE: md-links PATH [--stats] [--validate]');