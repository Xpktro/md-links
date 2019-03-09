import fetch from 'node-fetch';

const validateLink = link => new Promise(resolve =>
  fetch(link.href)
    .then(response => resolve({ ...link, status: response.status, ok: response.ok }))
    .catch(() => resolve({ ...link, status: null, ok: false }))
);

const validate = links => Promise.all(links.map(validateLink));

export default validate;
