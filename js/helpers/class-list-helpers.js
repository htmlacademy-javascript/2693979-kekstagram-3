const HIDDEN_CLASS = 'hidden';
const DISABLE_SCROLLING_CLASS = 'modal-open';

const toggleDisplayElement = (element) => {
  element.classList.toggle(HIDDEN_CLASS);
};

const togglePageScrolling = (element) => {
  element.classList.toggle(DISABLE_SCROLLING_CLASS);
};

const checkHiddenElement = (element) => element.classList.contains(HIDDEN_CLASS);

export { toggleDisplayElement, togglePageScrolling, checkHiddenElement };
