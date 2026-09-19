import { showMessageErrorData } from './util.js';
import { createGallery } from './gallery/gallery.js';
import { getData } from './api.js';
import { displaySorting } from './gallery/sorting.js';
import { initUploadForm } from './form/upload-form.js';

const FILTER_DEFAULT = 'filter-default';
let content;

getData()
  .then((galleryContent) => {
    createGallery(galleryContent, FILTER_DEFAULT);
    content = galleryContent;
  })
  .then(() => {
    displaySorting(content);
  })
  .catch(() => {
    showMessageErrorData();
  });

initUploadForm();
