import { galleryParameters } from './parameters.js';
import { isEscapeKey } from './util.js';
import { toggleDisplayElement, togglePageScrolling } from './class-list-helpers.js';

const disableScrolling = document.querySelector(galleryParameters.DISABLE_SCROLLING_ELEMENT);
let popupContainer;
let close;
let additionalArguments;
let isPopupActive = 'popup';
let messageContainer;
let closeUploadMessageButton;
let messageBlock;

const togglePopup = (popup) => {
  togglePageScrolling(disableScrolling);
  toggleDisplayElement(popup);
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && isPopupActive === 'popup') {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupClick = () => {
  closePopup();
};

function closePopup() {
  togglePopup(popupContainer);
  close.removeEventListener('click', onPopupClick);
  document.removeEventListener('keydown', onPopupEscKeydown);
  if (additionalArguments) {
    additionalArguments.additionalFunction(additionalArguments.arguments);
  }
}

const createPopupCloseHandlers = (popupBlock, popupClose, popupArguments) => {
  popupContainer = popupBlock;
  close = popupClose;
  additionalArguments = popupArguments;

  close.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closePopupAfterSubmitForm = (popupBlock, popupClose, popupArguments) => {
  popupContainer = popupBlock;
  close = popupClose;
  additionalArguments = popupArguments;

  closePopup();
};

const onUploadMessageCloseClick = () => {
  closeUploadMessage();
};

const onUploadMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeUploadMessage();
  }
};

const onUploadMessageOtherClick = (evt) => {
  if (!messageBlock.contains(evt.target)) {
    closeUploadMessage();
  }
};

function closeUploadMessage() {
  messageContainer.textContent = '';
  closeUploadMessageButton.removeEventListener('click', onUploadMessageCloseClick);
  document.removeEventListener('keydown', onUploadMessageEscKeydown);
  document.removeEventListener('click', onUploadMessageOtherClick);
  isPopupActive = 'popup';
}

const createUploadMessageCloseHandlers = (button, uploadMessage, block) => {
  messageContainer = uploadMessage;
  closeUploadMessageButton = button;
  messageBlock = block;
  isPopupActive = 'message';

  closeUploadMessageButton.addEventListener('click', onUploadMessageCloseClick);
  document.addEventListener('keydown', onUploadMessageEscKeydown);
  document.addEventListener('click', onUploadMessageOtherClick);
};

const closeErrorData = (uploadMessage) => {
  setTimeout(() => {
    uploadMessage.textContent = '';
  }, 5000);
};

export { togglePopup, createPopupCloseHandlers, closePopupAfterSubmitForm, createUploadMessageCloseHandlers, closeErrorData };
