import { formParameters } from './parameters.js';
import { createUploadMessageCloseHandlers, closeErrorData } from './popup-helpers.js';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    let currentValue = getRandomInteger(min, max);
    // Проверка на уникальность
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const hasDuplicatesIgnoreCase = (array) => {
  const normalized = array.map((item) =>
    typeof item === 'string' ? item.toLocaleLowerCase() : item
  );
  return new Set(normalized).size !== normalized.length;
};

const showMessage = (template, button, inner) => {
  const uploadMessage = document.querySelector(formParameters.UPLOAD_MESSAGE);
  const messageTemplate = document.querySelector(template).content;
  const fragment = document.createDocumentFragment();
  const container = messageTemplate.cloneNode(true);
  const messageButton = container.querySelector(button);
  const messageInner = container.querySelector(inner);
  createUploadMessageCloseHandlers(messageButton, uploadMessage, messageInner);

  fragment.appendChild(container);
  uploadMessage.appendChild(fragment);
};

const showMessageErrorUpload = () => {
  showMessage(formParameters.ERROR_TEMPLATE, formParameters.ERROR_BUTTON, formParameters.ERROR_INNER);
};

const showMessageSuccessUpload = () => {
  showMessage(formParameters.SUCCESS_TEMPLATE, formParameters.SUCCESS_BUTTON, formParameters.SUCCESS_INNER);
};

const showMessageErrorData = () => {
  const uploadMessage = document.querySelector(formParameters.UPLOAD_MESSAGE);
  const errorDataTemplate = document.querySelector(formParameters.ERROR_DATA_TEMPLATE).content;
  const errorDataFragment = document.createDocumentFragment();
  const errorDataContainer = errorDataTemplate.cloneNode(true);

  errorDataFragment.appendChild(errorDataContainer);
  uploadMessage.appendChild(errorDataFragment);

  closeErrorData(uploadMessage);
};

export { getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, isEscapeKey, hasDuplicatesIgnoreCase, showMessageErrorUpload, showMessageSuccessUpload, showMessageErrorData };
