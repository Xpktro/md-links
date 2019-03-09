#!/usr/bin/env node
import mdLinks from './md-links';
import stats from './stats';

const options = {
  validate: !!~process.argv.indexOf('--validate'),
  stats: !!~process.argv.indexOf('--stats'),
};

process.argv[2]
  ? mdLinks(process.argv[2], options)
    .then(links => ({ links, stats: options.stats ? stats(links) : null }))
    .then(results => {
      if(!options.stats) {
        console.log(results.links.map(link =>
          `${link.file} ${link.line} ${link.href} ${options.validate ? `${link.ok ? 'ok' : 'fail'} ${link.status}` : '' } ${link.text}`
        ).join('\n'));
      } else {
        console.log(`Total: ${results.stats.total}\nUnique: ${results.stats.unique}${options.validate ? `\nBroken: ${results.stats.broken}` : ''}`);
      }
    })
    .catch(console.error)
  : console.log('USAGE: md-links PATH [--stats] [--validate]');
