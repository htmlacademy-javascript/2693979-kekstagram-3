import { FormParameters, ErrorMessages } from './parameters.js';
import { hasDuplicatesIgnoreCase, showMessageErrorUpload, showMessageSuccessUpload } from './util.js';
import { togglePopup, createPopupCloseHandlers } from './popup-helpers.js';
import { sliderInit, removeEffectsEvents, uploadBlock, imagePreview } from './slider-effects.js';
import { sendData } from './api.js';

const form = uploadBlock.querySelector(FormParameters.UPLOAD_FORM);
const imageInput = uploadBlock.querySelector(FormParameters.UPLOAD_IMAGE_INPUT);
const hashtagsInput = uploadBlock.querySelector(FormParameters.HASHTAGS_INPUT);
const commentsText = uploadBlock.querySelector(FormParameters.COMMENTS_TEXT);
const editingBlock = uploadBlock.querySelector(FormParameters.EDITING_BLOCK);
const formClose = uploadBlock.querySelector(FormParameters.FORM_CLOSE);
const buttonSmaller = uploadBlock.querySelector(FormParameters.BUTTON_SMALLER);
const buttonBigger = uploadBlock.querySelector(FormParameters.BUTTON_BIGGER);
const scaleInput = uploadBlock.querySelector(FormParameters.SCALE_INPUT);
const submitButton = uploadBlock.querySelector(FormParameters.UPLOAD_SUBMIT_BUTTON);

const maxScale = 1;
const minScale = 0.25;
let scale = 1;
const step = 0.25;

const scaleSmaller = () => {
  if (scale > minScale) {
    scale -= step;
    imagePreview.style.transform = `scale(${ scale})`;
    scaleInput.value = scale * 100;
  }
};

const scaleBigger = () => {
  if (scale < maxScale) {
    scale += step;
    imagePreview.style.transform = `scale(${ scale})`;
    scaleInput.value = scale * 100;
  }
};

const scaleToImage = () => {
  imagePreview.style.transform = `scale(${ scale})`;
  buttonSmaller.addEventListener('click', scaleSmaller);
  buttonBigger.addEventListener('click', scaleBigger);
};

let errorMessage = '';

const validateHashtags = (value) => {
  const hashtags = value.split(' ').filter((part) => part.length > 0);
  const regexp = /^#[a-zа-яё0-9]+$/i;
  let error = false;

  if (hashtags.length > 5) {
    errorMessage += ErrorMessages.ERROR_MESSAGE_1;
    error = true;
  }

  if (hasDuplicatesIgnoreCase(hashtags)) {
    errorMessage += ErrorMessages.ERROR_MESSAGE_2;
    error = true;
  }

  for (const hashtag of hashtags) {
    if (hashtag[0] !== '#' && hashtag !== '') {
      errorMessage += ErrorMessages.ERROR_MESSAGE_3;
      error = true;
    }
    if (hashtag[0] === '#' && hashtag.length === 1) {
      errorMessage += ErrorMessages.ERROR_MESSAGE_4;
      error = true;
    }
    if (hashtag.length > 20) {
      errorMessage += ErrorMessages.ERROR_MESSAGE_5;
      error = true;
    }
    if (hashtag[0] === '#' && !regexp.test(hashtag)) {
      errorMessage += ErrorMessages.ERROR_MESSAGE_6;
      error = true;
    }
  }
  return !error;
};

const getHashtagsErrorMessage = () => {
  const error = errorMessage;
  errorMessage = '';
  return error;
};

const resetScale = () => {
  scale = 1;
  imagePreview.style.transform = null;
  buttonSmaller.removeEventListener('click', scaleSmaller);
  buttonBigger.removeEventListener('click', scaleBigger);
};

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

const resetForm = (arrayArguments) => {
  arrayArguments[0].value = '';
  arrayArguments[1].style.filter = null;
  resetScale();
  removeEffectsEvents();
  resetFormTextFields();
  removeStopPaginationEvent();
};

const resetFormObject = {
  additionalFunction: resetForm,
  arguments: [imageInput, imagePreview]
};

const uploadForm = () => {
  imageInput.addEventListener('change', () => {
    togglePopup(editingBlock);

    scaleToImage();
    sliderInit();

    hashtagsInput.addEventListener('keydown', stopPaginationEvent);
    commentsText.addEventListener('keydown', stopPaginationEvent);

    createPopupCloseHandlers(editingBlock, formClose, resetFormObject);
  });
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(hashtagsInput, validateHashtags, getHashtagsErrorMessage);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target), showMessageErrorUpload)
        .then(() => {
          onSuccess(editingBlock, formClose, resetFormObject);
          showMessageSuccessUpload();
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};

export { uploadForm, setUserFormSubmit };
