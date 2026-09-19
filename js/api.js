const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const GET_DATA = '/data/';
const SEND_DATA = '/';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method = Method.GET, body = null) =>
  fetch(`${ BASE_URL}${ route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });

const getData = () => load(GET_DATA);

const sendData = (body) => load(SEND_DATA, Method.POST, body);

export { getData, sendData };
