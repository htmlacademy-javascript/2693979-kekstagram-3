import { createGalleryArray } from './data.js';
import { createThumbnailsBlock } from './thumbnails.js';
import { showBigPhotoPopup } from './popup-big-photo.js';

const data = createGalleryArray();

const createGallery = (galleryBlock, template, popup) => {
  createThumbnailsBlock(galleryBlock, template, data, showBigPhotoPopup, popup);
};

export { createGallery };
