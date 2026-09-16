import { galleryParameters } from './parameters.js';
import { isEscapeKey } from './util.js';
import { toggleDisplayElement, togglePageScrolling } from './class-list-helpers.js';

const disableScrolling = document.querySelector(galleryParameters.DISABLE_SCROLLING_ELEMENT);

const togglePopup = (popup) => {
  togglePageScrolling(disableScrolling);
  toggleDisplayElement(popup);
};

const createPopupCloseHandlers = (popupBlock, popupClose, additionalArguments) => {
  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  const onPopupClick = () => {
    closePopup();
  };

  function closePopup() {
    togglePopup(popupBlock);
    popupClose.removeEventListener('click', onPopupClick);
    document.removeEventListener('keydown', onPopupEscKeydown);
    if (additionalArguments) {
      additionalArguments.additionalFunction(additionalArguments.arguments);
    }
  }

  popupClose.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export { togglePopup, createPopupCloseHandlers };
