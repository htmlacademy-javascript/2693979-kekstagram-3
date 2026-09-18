import { GalleryParameters } from './parameters.js';
import { createGallery } from './gallery.js';
import { debounce } from './util.js';

const imageFilters = document.querySelector(GalleryParameters.IMAGE_FILTERS);
const filterDefault = imageFilters.querySelector(GalleryParameters.FILTER_DEFAULT);
const filterRandom = imageFilters.querySelector(GalleryParameters.FILTER_RANDOM);
const filterDiscussed = imageFilters.querySelector(GalleryParameters.FILTER_DISCUSSED);
const buttonActiveClass = GalleryParameters.IMAGE_FILTERS_BUTTON_ACTIVE;

const displaySorting = (content) => {
  imageFilters.classList.remove(GalleryParameters.IMAGE_FILTERS_INACTIVE);

  const debouncedCreateDefault = debounce(
    () => createGallery(content, 'default'),
    GalleryParameters.DEBOUNCE_TIME);

  const debouncedCreateRandom = debounce(
    () => createGallery(content, 'random'),
    GalleryParameters.DEBOUNCE_TIME);

  const debouncedCreateDiscussed = debounce(
    () => createGallery(content, 'discussed'),
    GalleryParameters.DEBOUNCE_TIME);

  filterDefault.addEventListener('click', () => {
    if (!filterDefault.classList.contains(buttonActiveClass)) {
      filterDefault.classList.add(buttonActiveClass);
      filterRandom.classList.remove(buttonActiveClass);
      filterDiscussed.classList.remove(buttonActiveClass);

      debouncedCreateDefault();
    }
  });

  filterRandom.addEventListener('click', () => {
    if (!filterRandom.classList.contains(buttonActiveClass)) {
      filterRandom.classList.add(buttonActiveClass);
      filterDefault.classList.remove(buttonActiveClass);
      filterDiscussed.classList.remove(buttonActiveClass);

      debouncedCreateRandom();
    }
  });

  filterDiscussed.addEventListener('click', () => {
    if (!filterDiscussed.classList.contains(buttonActiveClass)) {
      filterDiscussed.classList.add(buttonActiveClass);
      filterRandom.classList.remove(buttonActiveClass);
      filterDefault.classList.remove(buttonActiveClass);

      debouncedCreateDiscussed();
    }
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
