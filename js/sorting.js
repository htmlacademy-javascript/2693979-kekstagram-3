import { GalleryParameters } from './parameters.js';
import { createGallery } from './gallery.js';
import { debounce } from './util.js';

const imageFilters = document.querySelector(GalleryParameters.IMAGE_FILTERS);
const buttonClass = GalleryParameters.IMAGE_FILTERS_BUTTON;
const buttonActiveClass = GalleryParameters.IMAGE_FILTERS_BUTTON_ACTIVE;
let currentFilter = GalleryParameters.FILTER_DEFAULT;

const displaySorting = (content) => {
  imageFilters.classList.remove(GalleryParameters.IMAGE_FILTERS_INACTIVE);

  const debouncedCreateGallery = debounce(
    () => createGallery(content, currentFilter),
    GalleryParameters.DEBOUNCE_TIME
  );

  imageFilters.addEventListener('click', (evt) => {
    const target = evt.target.closest(`.${buttonClass}`); // безопаснее, чем evt.target
    if (!target) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    imageFilters
      .querySelector(`.${buttonActiveClass}`)
      .classList.remove(buttonActiveClass);
    clickedButton.classList.add(buttonActiveClass);
    currentFilter = clickedButton.id;

    debouncedCreateGallery();
  });
};

const sortingRandom = (array) => {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, GalleryParameters.MAX_RANDOM_IMAGES);
};

const sortingDiscussed = (array) => {
  const shuffled = array.slice().sort((elementA, elementB) => elementB.comments.length - elementA.comments.length);
  return shuffled;
};

export { displaySorting, sortingRandom, sortingDiscussed };
