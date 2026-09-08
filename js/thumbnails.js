import { createGalleryArray } from './data.js';

const thumbnailTemplate = document.querySelector('#picture').content;
const thumbnailsContainer = document.querySelector('.pictures');
const thumbnails = createGalleryArray();
const thumbnailsFragment = document.createDocumentFragment();

const createThumbnailsBlock = () => {
  thumbnails.forEach(({url, description, comments, likes}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__img').alt = description;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailsFragment.appendChild(thumbnailElement);
  });
  thumbnailsContainer.appendChild(thumbnailsFragment);
};

export { createThumbnailsBlock };
