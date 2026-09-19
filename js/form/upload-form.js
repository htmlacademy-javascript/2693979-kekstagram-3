import { showMessageErrorUpload, showMessageSuccessUpload } from '../util.js';
import { togglePopup, createPopupCloseHandlers, closePopupAfterSubmitForm } from '../helpers/popup-helpers.js';
import { initSlider, removeEffectsEvents, uploadBlock, imagePreview, effectNone } from './slider-effects.js';
import { sendData } from '../api.js';
import { scaleToImage, resetScale } from './scale.js';
import { validateHashtags, validateCommentsText, getHashtagsErrorMessage, getCommentsErrorMessage } from './validate.js';

const DEFAULT_IMAGE_URL = 'img/upload-default-image.jpg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = uploadBlock.querySelector('.img-upload__form');
const imageInput = uploadBlock.querySelector('.img-upload__input');
const effectsPreview = uploadBlock.querySelectorAll('.effects__preview');
const hashtagsInput = uploadBlock.querySelector('.text__hashtags');
const commentsText = uploadBlock.querySelector('.text__description');
const editingBlock = uploadBlock.querySelector('.img-upload__overlay');
const formClose = uploadBlock.querySelector('.img-upload__cancel');
const submitButton = uploadBlock.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const resetFormTextFields = () => {
  hashtagsInput.value = '';
  commentsText.value = '';
};

const stopPaginationEvent = (evt) => {
  evt.stopPropagation();
};

const removeStopPaginationEvent = () => {
  hashtagsInput.removeEventListener('keydown', stopPaginationEvent);
  commentsText.removeEventListener('keydown', stopPaginationEvent);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = () => {
  pristine.addValidator(hashtagsInput, validateHashtags, getHashtagsErrorMessage);
  pristine.addValidator(commentsText, validateCommentsText, getCommentsErrorMessage);

  form.addEventListener('submit', submitForm);
};

const resetForm = (arrayArguments) => {
  arrayArguments[0].value = '';
  arrayArguments[1].style.filter = null;
  arrayArguments[1].src = DEFAULT_IMAGE_URL;
  arrayArguments[2].forEach((preview) => {
    preview.style.backgroundImage = null;
  });
  effectNone.checked = true;
  resetScale();
  removeEffectsEvents();
  resetFormTextFields();
  removeStopPaginationEvent();
  pristine.reset();
  form.removeEventListener('submit', submitForm);
};

const resetFormObject = {
  additionalFunction: resetForm,
  arguments: [imageInput, imagePreview, effectsPreview]
};

function submitForm(evt) {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closePopupAfterSubmitForm(editingBlock, formClose, resetFormObject);
        showMessageSuccessUpload();
      })
      .catch(() => {
        showMessageErrorUpload();
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
}

const initUploadForm = () => {
  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

    if (matches) {
      togglePopup(editingBlock);
      const blobUrl = URL.createObjectURL(file);
      imagePreview.src = blobUrl;
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url("${blobUrl}")`;
      });
      scaleToImage();
      initSlider();

      hashtagsInput.addEventListener('keydown', stopPaginationEvent);
      commentsText.addEventListener('keydown', stopPaginationEvent);

      createPopupCloseHandlers(editingBlock, formClose, resetFormObject);
      setUserFormSubmit();
    }
  });
};

export { initUploadForm, setUserFormSubmit };
