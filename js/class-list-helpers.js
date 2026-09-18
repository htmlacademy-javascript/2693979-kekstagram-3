import { GalleryParameters } from './parameters.js';

const toggleDisplayElement = (element) => {
  element.classList.toggle(GalleryParameters.HIDDEN);
};

const togglePageScrolling = (element) => {
  element.classList.toggle(GalleryParameters.DISABLE_SCROLLING);
};

const checkHiddenElement = (element) => element.classList.contains(GalleryParameters.HIDDEN);

export { toggleDisplayElement, togglePageScrolling, checkHiddenElement };
