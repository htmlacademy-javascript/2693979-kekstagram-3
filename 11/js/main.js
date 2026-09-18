import { showMessageErrorData } from './util.js';
import { createGallery } from './gallery.js';
import { getData } from './api.js';
import { uploadForm, setUserFormSubmit } from './upload-form.js';
import { closePopupAfterSubmitForm } from './popup-helpers.js';

getData(showMessageErrorData)
  .then((galleryContent) => {
    createGallery(galleryContent);
  });

uploadForm();
setUserFormSubmit(closePopupAfterSubmitForm);
