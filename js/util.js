import { createUploadMessageCloseHandlers, closeErrorData } from './helpers/popup-helpers.js';

const ERROR_TEMPLATE = '#error';
const ERROR_BUTTON = '.error__button';
const ERROR_INNER = '.error__inner';
const SUCCESS_TEMPLATE = '#success';
const SUCCESS_BUTTON = '.success__button';
const SUCCESS_INNER = '.success__inner';
const ERROR_DATA_TEMPLATE = '#data-error';

const uploadMessage = document.querySelector('.upload-message');

const isEscapeKey = (evt) => evt.key === 'Escape';

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
  showMessage(ERROR_TEMPLATE, ERROR_BUTTON, ERROR_INNER);
};

const showMessageSuccessUpload = () => {
  showMessage(SUCCESS_TEMPLATE, SUCCESS_BUTTON, SUCCESS_INNER);
};

const showMessageErrorData = () => {
  showMessage(ERROR_DATA_TEMPLATE, false, false, closeErrorData);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showMessageErrorUpload, showMessageSuccessUpload, showMessageErrorData, debounce };
