import { FormParameters } from './parameters.js';
import { createUploadMessageCloseHandlers, closeErrorData } from './popup-helpers.js';

const uploadMessage = document.querySelector(FormParameters.UPLOAD_MESSAGE);

const isEscapeKey = (evt) => evt.key === 'Escape';

const hasDuplicatesIgnoreCase = (array) => {
  const normalized = array.map((item) =>
    typeof item === 'string' ? item.toLocaleLowerCase() : item
  );
  return new Set(normalized).size !== normalized.length;
};

const showMessage = (template, button = false, inner = false, autoClose = false) => {
  const messageTemplate = document.querySelector(template).content;
  const fragment = document.createDocumentFragment();
  const container = messageTemplate.cloneNode(true);

  if (button && inner) {
    const messageButton = container.querySelector(button);
    const messageInner = container.querySelector(inner);
    createUploadMessageCloseHandlers(messageButton, uploadMessage, messageInner);
  }

  fragment.appendChild(container);
  uploadMessage.appendChild(fragment);

  if (autoClose) {
    autoClose(uploadMessage);
  }
};

const showMessageErrorUpload = () => {
  showMessage(FormParameters.ERROR_TEMPLATE, FormParameters.ERROR_BUTTON, FormParameters.ERROR_INNER);
};

const showMessageSuccessUpload = () => {
  showMessage(FormParameters.SUCCESS_TEMPLATE, FormParameters.SUCCESS_BUTTON, FormParameters.SUCCESS_INNER);
};

const showMessageErrorData = () => {
  showMessage(FormParameters.ERROR_DATA_TEMPLATE, false, false, closeErrorData);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, hasDuplicatesIgnoreCase, showMessageErrorUpload, showMessageSuccessUpload, showMessageErrorData, debounce };
