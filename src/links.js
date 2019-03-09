import { readFile } from 'fs';

const extractContent = file =>
  new Promise(resolve =>
    readFile(file, (err, contents) =>
      resolve(contents.toString())
    )
  );

const getAllMatches = (regex, string, matches=[]) => {
  const match = regex.exec(string);
  return match ? [...matches, match[1], match[2], ...getAllMatches(regex, string, matches)] : [];
};

const extractLinks = file => {
  const linkRegex = /\[([^\[\]]+)\]\(([^\(\)]+)\)/g;
  return extractContent(file).then(contents =>
    [].concat(...(contents || '').split('\n').map((line, lineNumber) => {
      const matches = getAllMatches(linkRegex, line);
      const contents = matches.filter((match, index) => index % 2 === 0);
      const hrefs = matches.filter((match, index) => index % 2 !== 0);
      return contents.map((text, index) => (
        {
          file,
          text,
          line: lineNumber + 1,
          href: hrefs[index],
        }
      ));
    }))
  );
};

const getLinks = files => {
  return Promise.all(files.map(extractLinks)).then(links => [].concat(...links));
};

export default getLinks;
