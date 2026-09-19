import { showBigPhoto } from './show-big-photo.js';
import { sortingRandom, sortingDiscussed } from './sorting.js';

const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';
const GALLERY_ELEMENT = '.picture';
const GALLERY_ELEMENT_IMAGE = '.picture__img';
const GALLERY_ELEMENT_COMMENTS = '.picture__comments';
const GALLERY_ELEMENT_LIKES = '.picture__likes';

const galleryContainer = document.querySelector('.pictures');
const galleryTemplate = document.querySelector('#picture').content;
const galleryFragment = document.createDocumentFragment();

const clearGallery = () => {
  const galleryElements = galleryContainer.querySelectorAll(GALLERY_ELEMENT);
  galleryElements.forEach((element) => {
    element.remove();
  });
};

const createGallery = (galleryContent, sorting) => {
  clearGallery();
  let resultContent;

  switch (sorting) {
    case FILTER_RANDOM:
      resultContent = sortingRandom(galleryContent);
      break;
    case FILTER_DISCUSSED:
      resultContent = sortingDiscussed(galleryContent);
      break;
    default:
      resultContent = galleryContent;
  }

  resultContent.forEach((galleryElement) => {
    const galleryContainerElement = galleryTemplate.cloneNode(true);
    const link = galleryContainerElement.querySelector(GALLERY_ELEMENT);
    link.href = galleryElement.url;
    const image = galleryContainerElement.querySelector(GALLERY_ELEMENT_IMAGE);
    image.src = galleryElement.url;
    image.alt = galleryElement.description;
    galleryContainerElement.querySelector(GALLERY_ELEMENT_COMMENTS).
      textContent = galleryElement.comments.length;
    galleryContainerElement.querySelector(GALLERY_ELEMENT_LIKES).
      textContent = galleryElement.likes;
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPhoto(galleryElement);
    });
    galleryFragment.appendChild(galleryContainerElement);
  });
  galleryContainer.appendChild(galleryFragment);
};

export { createGallery };
