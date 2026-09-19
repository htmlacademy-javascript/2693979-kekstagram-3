import { createGallery } from './gallery.js';
import { debounce } from '../util.js';

const BUTTON_CLASS = 'img-filters__button';
const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
const IMAGE_FILTERS_INACTIVE = 'img-filters--inactive';
const MAX_RANDOM_IMAGES = 10;
const DEBOUNCE_TIME = 500;

const imageFilters = document.querySelector('.img-filters');
let activeFilterButton = imageFilters.querySelector(`.${BUTTON_ACTIVE_CLASS}`);
let currentFilter = 'filter-default';

const displaySorting = (content) => {
  imageFilters.classList.remove(IMAGE_FILTERS_INACTIVE);

  const debouncedCreateGallery = debounce(
    () => createGallery(content, currentFilter),
    DEBOUNCE_TIME
  );

  imageFilters.addEventListener('click', (evt) => {
    const target = evt.target.closest(`.${BUTTON_CLASS}`);

    if (!target) {
      return;
    }

    if (target === activeFilterButton) {
      return;
    }

    activeFilterButton.classList.remove(BUTTON_ACTIVE_CLASS);
    target.classList.add(BUTTON_ACTIVE_CLASS);
    activeFilterButton = target;
    currentFilter = target.id;
    debouncedCreateGallery();
  });
};

const sortingRandom = (pictures) => {
  const shuffledPictures = pictures.slice().sort(() => 0.5 - Math.random());
  return shuffledPictures.slice(0, MAX_RANDOM_IMAGES);
};

const sortingDiscussed = (pictures) => {
  const shuffledPictures = pictures.slice().sort((elementA, elementB) => elementB.comments.length - elementA.comments.length);
  return shuffledPictures;
};

export { displaySorting, sortingRandom, sortingDiscussed };
