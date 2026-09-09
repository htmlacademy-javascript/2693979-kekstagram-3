import { createGalleryArray } from './data.js';

const thumbnails = createGalleryArray();
const thumbnailsFragment = document.createDocumentFragment();

const createThumbnailsBlock = (container, template) => {
  const thumbnailsContainer = document.querySelector(`.${ container}`);
  const thumbnailTemplate = document.querySelector(`#${ template}`).content;
  thumbnails.forEach(({url, description, comments, likes}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector(`.${ template}__img`).src = url;
    thumbnailElement.querySelector(`.${ template}__img`).alt = description;
    thumbnailElement.querySelector(`.${ template}__comments`).textContent = comments.length;
    thumbnailElement.querySelector(`.${ template}__likes`).textContent = likes;
    thumbnailsFragment.appendChild(thumbnailElement);
  });
  thumbnailsContainer.appendChild(thumbnailsFragment);
};

export { createThumbnailsBlock };
