import { GalleryParameters } from './parameters.js';
import { showBigPhoto } from './show-big-photo.js';

const galleryContainer = document.querySelector(GalleryParameters.GALLERY_CONTAINER);
const galleryTemplate = document.querySelector(GalleryParameters.GALLERY_TEMPLATE).content;
const galleryFragment = document.createDocumentFragment();

const createGallery = (galleryContent) => {
  galleryContent.forEach((galleryElement) => {
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
