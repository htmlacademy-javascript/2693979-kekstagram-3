import { FormParameters } from './parameters.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, showErrorMessage, method = Method.GET, body = null) =>
  fetch(`${ FormParameters.BASE_URL}${ route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      showErrorMessage();
      throw error;
    });

const getData = (showErrorMessage) => load(FormParameters.GET_DATA, showErrorMessage);

const sendData = (body, showErrorMessage) => load(FormParameters.SEND_DATA, showErrorMessage, Method.POST, body);

export { getData, sendData };
