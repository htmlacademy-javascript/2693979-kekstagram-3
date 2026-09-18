import { galleryParameters } from './parameters.js';
import { showBigPhoto } from './show-big-photo.js';

const galleryContainer = document.querySelector(galleryParameters.GALLERY_CONTAINER);
const galleryTemplate = document.querySelector(galleryParameters.GALLERY_TEMPLATE).content;
const galleryFragment = document.createDocumentFragment();

const createGallery = (galleryContent) => {
  galleryContent.forEach((galleryElement) => {
    const galleryContainerElement = galleryTemplate.cloneNode(true);
    const link = galleryContainerElement.querySelector(galleryParameters.GALLERY_TEMPLATE_LINK);
    link.href = galleryElement.url;
    galleryContainerElement.querySelector(galleryParameters.GALLERY_TEMPLATE_IMAGE).
      src = galleryElement.url;
    galleryContainerElement.querySelector(galleryParameters.GALLERY_TEMPLATE_IMAGE).
      alt = galleryElement.description;
    galleryContainerElement.querySelector(galleryParameters.GALLERY_TEMPLATE_COMMENTS).
      textContent = galleryElement.comments.length;
    galleryContainerElement.querySelector(galleryParameters.GALLERY_TEMPLATE_LIKES).
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
