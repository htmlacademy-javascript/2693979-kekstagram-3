import { GalleryParameters } from './parameters.js';
import { showMessageErrorData } from './util.js';
import { createGallery } from './gallery.js';
import { getData } from './api.js';
import { displaySorting } from './sorting.js';
import { initUploadForm } from './upload-form.js';

let content;

getData()
  .then((galleryContent) => {
    createGallery(galleryContent, GalleryParameters.FILTER_DEFAULT);
    content = galleryContent;
  })
  .then(() => {
    displaySorting(content);
  })
  .catch(() => {
    showMessageErrorData();
  });

initUploadForm();
