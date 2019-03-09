import { stat, readdir } from 'fs';
import { resolve as pathResolve, join } from 'path';

const getFiles = (path) => new Promise((resolve, reject) => {
  const absolutePath = pathResolve(path);
  stat(
    absolutePath,
    (err, stats) => {
      if(err) {
       return reject(`Invalid path: ${path}`);
      }

      if(stats.isFile()) {
        return resolve(absolutePath);
      } else {
        readdir(absolutePath, (err, files) => {
          const absolutePaths = files.map(file => join(absolutePath, file));
          Promise.all(absolutePaths.map(getFiles))
            .then(paths => resolve([].concat(...paths)));
        });
      }
    }
  );
});

const getFilesByExtension = (path, extension) =>
  getFiles(path)
    .then(files =>
      files.filter(file => file.endsWith(extension))
    );

const getMarkdownFiles = path => getFilesByExtension(path, '.md');

export default getMarkdownFiles;
