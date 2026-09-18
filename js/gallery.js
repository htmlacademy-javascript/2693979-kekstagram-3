import { GalleryParameters } from './parameters.js';
import { showBigPhoto } from './show-big-photo.js';
import { sortingRandom, sortingDiscussed } from './sorting.js';

const galleryContainer = document.querySelector(GalleryParameters.GALLERY_CONTAINER);
const galleryTemplate = document.querySelector(GalleryParameters.GALLERY_TEMPLATE).content;
const galleryFragment = document.createDocumentFragment();

const clearGallery = () => {
  const galleryElements = galleryContainer.querySelectorAll(GalleryParameters.GALLERY_TEMPLATE_LINK);
  galleryElements.forEach((element) => {
    element.remove();
  });
};

const createGallery = (galleryContent, sorting) => {
  clearGallery();
  let resultContent;

  switch (sorting) {
    case GalleryParameters.FILTER_RANDOM:
      resultContent = sortingRandom(galleryContent);
      break;
    case GalleryParameters.FILTER_DISCUSSED:
      resultContent = sortingDiscussed(galleryContent);
      break;
    case GalleryParameters.FILTER_DEFAULT:
      resultContent = galleryContent;
  }

  resultContent.forEach((galleryElement) => {
    const galleryContainerElement = galleryTemplate.cloneNode(true);
    const link = galleryContainerElement.querySelector(GalleryParameters.GALLERY_TEMPLATE_LINK);
    link.href = galleryElement.url;
    galleryContainerElement.querySelector(GalleryParameters.GALLERY_TEMPLATE_IMAGE).
      src = galleryElement.url;
    galleryContainerElement.querySelector(GalleryParameters.GALLERY_TEMPLATE_IMAGE).
      alt = galleryElement.description;
    galleryContainerElement.querySelector(GalleryParameters.GALLERY_TEMPLATE_COMMENTS).
      textContent = galleryElement.comments.length;
    galleryContainerElement.querySelector(GalleryParameters.GALLERY_TEMPLATE_LIKES).
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
