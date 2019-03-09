import getFiles from './files';
import getLinks from './links';
import validate from './validation';

export default (path, options = {}) =>
  getFiles(path)
    .then(getLinks)
    .then(links => options.validate ? validate(links) : links);
