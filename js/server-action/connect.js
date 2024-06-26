import { alertLoadError } from '../utils.js';

const getServerData = () =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        alertLoadError();
      }
      return response.json();
    })
    .catch(() => {
      alertLoadError();
    });

export { getServerData };
