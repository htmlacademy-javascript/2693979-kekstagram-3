import { GalleryParameters } from './parameters.js';
import { createGallery } from './gallery.js';
import { debounce } from './util.js';

const imageFilters = document.querySelector(GalleryParameters.IMAGE_FILTERS);
const buttonClass = GalleryParameters.IMAGE_FILTERS_BUTTON;
const buttonActiveClass = GalleryParameters.IMAGE_FILTERS_BUTTON_ACTIVE;
let activeFilterButton = imageFilters.querySelector(`.${buttonActiveClass}`);
let currentFilter = GalleryParameters.FILTER_DEFAULT;

const displaySorting = (content) => {
  imageFilters.classList.remove(GalleryParameters.IMAGE_FILTERS_INACTIVE);

  const debouncedCreateGallery = debounce(
    () => createGallery(content, currentFilter),
    GalleryParameters.DEBOUNCE_TIME
  );

  imageFilters.addEventListener('click', (evt) => {
    const target = evt.target.closest(`.${buttonClass}`);

    if (!target) {
      return;
    }

    if (target === activeFilterButton) {
      return;
    }

    activeFilterButton.classList.remove(buttonActiveClass);

    target.classList.add(buttonActiveClass);
    activeFilterButton = target;

    currentFilter = target.id;
    debouncedCreateGallery();
  });
};

const sortingRandom = (pictures) => {
  const shuffledPictures = pictures.slice().sort(() => 0.5 - Math.random());
  return shuffledPictures.slice(0, GalleryParameters.MAX_RANDOM_IMAGES);
};

const sortingDiscussed = (pictures) => {
  const shuffledPictures = pictures.slice().sort((elementA, elementB) => elementB.comments.length - elementA.comments.length);
  return shuffledPictures;
};

export { displaySorting, sortingRandom, sortingDiscussed };
