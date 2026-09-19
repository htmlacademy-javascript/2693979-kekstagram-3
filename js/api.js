import { FormParameters } from './parameters.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method = Method.GET, body = null) =>
  fetch(`${ FormParameters.BASE_URL}${ route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });

const getData = () => load(FormParameters.GET_DATA);

const sendData = (body) => load(FormParameters.SEND_DATA, Method.POST, body);

export { getData, sendData };
