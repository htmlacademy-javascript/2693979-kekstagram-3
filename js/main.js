import { showMessageErrorData } from './util.js';
import { createGallery } from './gallery.js';
import { getData } from './api.js';
import { displaySorting } from './sorting.js';
import { uploadForm, setUserFormSubmit } from './upload-form.js';
import { closePopupAfterSubmitForm } from './popup-helpers.js';

let content;

getData(showMessageErrorData)
  .then((galleryContent) => {
    createGallery(galleryContent, 'default');
    content = galleryContent;
  })
  .then(() => {
    displaySorting(content);
  });

uploadForm();
setUserFormSubmit(closePopupAfterSubmitForm);
