## What is this
See [here](https://github.com/laboratoria/curricula-js/blob/master/projects/04-md-links/README.md)

## Install
`npm install xpktro/md-links`

## Use (CLI)
`md-links PATH [--stats] [--validate]`

## Use (Library)
```js
import mdLinks from 'md-links';

mdLinks('./some/path', { validate: true })
  .then(links => console.log(links))
  .catch(error => console.log(error));
```

## 😸
