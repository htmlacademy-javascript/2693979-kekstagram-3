const toggleDisplayElement = (element) => {
  element.classList.toggle('hidden');
};

const togglePageScrolling = (element) => {
  element.classList.toggle('modal-open');
};

const checkHiddenElement = (element) => {
  element.classList.contains('hidden');
};

export { toggleDisplayElement, togglePageScrolling, checkHiddenElement };
