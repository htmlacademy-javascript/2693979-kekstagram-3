import { galleryParameters } from './parameters.js';

const toggleDisplayElement = (element) => {
  element.classList.toggle(galleryParameters.HIDDEN);
};

const togglePageScrolling = (element) => {
  element.classList.toggle(galleryParameters.DISABLE_SCROLLING);
};

const checkHiddenElement = (element) => element.classList.contains(galleryParameters.HIDDEN);

export { toggleDisplayElement, togglePageScrolling, checkHiddenElement };
