import { FormParameters, ErrorMessages } from './parameters.js';
import { hasDuplicatesIgnoreCase, showMessageErrorUpload, showMessageSuccessUpload } from './util.js';
import { togglePopup, createPopupCloseHandlers, closePopupAfterSubmitForm } from './popup-helpers.js';
import { initSlider, removeEffectsEvents, uploadBlock, imagePreview, effectNone } from './slider-effects.js';
import { sendData } from './api.js';

const form = uploadBlock.querySelector(FormParameters.UPLOAD_FORM);
const imageInput = uploadBlock.querySelector(FormParameters.UPLOAD_IMAGE_INPUT);
const effectsPreview = uploadBlock.querySelectorAll(FormParameters.EFFECTS_PREVIEW);
const hashtagsInput = uploadBlock.querySelector(FormParameters.HASHTAGS_INPUT);
const commentsText = uploadBlock.querySelector(FormParameters.COMMENTS_TEXT);
const editingBlock = uploadBlock.querySelector(FormParameters.EDITING_BLOCK);
const formClose = uploadBlock.querySelector(FormParameters.FORM_CLOSE);
const buttonSmaller = uploadBlock.querySelector(FormParameters.BUTTON_SMALLER);
const buttonBigger = uploadBlock.querySelector(FormParameters.BUTTON_BIGGER);
const scaleInput = uploadBlock.querySelector(FormParameters.SCALE_INPUT);
const submitButton = uploadBlock.querySelector(FormParameters.UPLOAD_SUBMIT_BUTTON);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const MAX_SCALE = 1;
const MIN_SCALE = 0.25;
const STEP = 0.25;
const SCALE_DEFAULT_VALUE = '100%';
const SCALE_A_PERCENT = 100;
let scale = 1;

const scaleSmaller = () => {
  if (scale > MIN_SCALE) {
    scale -= STEP;
    imagePreview.style.transform = `scale(${ scale})`;
    scaleInput.value = `${scale * SCALE_A_PERCENT }%`;
  }
};

const scaleBigger = () => {
  if (scale < MAX_SCALE) {
    scale += STEP;
    imagePreview.style.transform = `scale(${ scale})`;
    scaleInput.value = `${scale * SCALE_A_PERCENT }%`;
  }
};

const scaleToImage = () => {
  imagePreview.style.transform = `scale(${ scale})`;
  buttonSmaller.addEventListener('click', scaleSmaller);
  buttonBigger.addEventListener('click', scaleBigger);
};

let errorHashtagsMessage = '';

const validateHashtags = (value) => {
  const hashtags = value.split(' ').filter((part) => part.length > 0);
  const regexp = /^#[a-zа-яё0-9]+$/i;

  const errors = new Set();
  let isValid = false;

  if (hashtags.length > FormParameters.MAX_HASHTAGS) {
    errors.add(ErrorMessages.ERROR_MESSAGE_1);
    isValid = true;
  }

  if (hasDuplicatesIgnoreCase(hashtags)) {
    errors.add(ErrorMessages.ERROR_MESSAGE_2);
    isValid = true;
  }

  hashtags.forEach((hashtag) => {
    if (hashtag[0] !== '#' && hashtag !== '') {
      errors.add(ErrorMessages.ERROR_MESSAGE_3);
      isValid = true;
    }
    if (hashtag[0] === '#' && hashtag.length === 1) {
      errors.add(ErrorMessages.ERROR_MESSAGE_4);
      isValid = true;
    }
    if (hashtag.length > FormParameters.MAX_HASHTAG_LENGTH) {
      errors.add(ErrorMessages.ERROR_MESSAGE_5);
      isValid = true;
    }
    if (hashtag[0] === '#' && !regexp.test(hashtag)) {
      errors.add(ErrorMessages.ERROR_MESSAGE_6);
      isValid = true;
    }
  });
  errorHashtagsMessage = Array.from(errors).join('');

  return !isValid;
};

const getHashtagsErrorMessage = () => {
  const error = errorHashtagsMessage;
  errorHashtagsMessage = '';
  return error;
};

const validateCommentsText = (value) => !(value.length > FormParameters.MAX_COMMENT_LENGTH);

const getCommentsErrorMessage = () => ErrorMessages.ERROR_MESSAGE_7;

const resetScale = () => {
  scale = 1;
  imagePreview.style.transform = null;
  buttonSmaller.removeEventListener('click', scaleSmaller);
  buttonBigger.removeEventListener('click', scaleBigger);
  scaleInput.value = SCALE_DEFAULT_VALUE;
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
  arrayArguments[1].src = FormParameters.DEFAULT_IMAGE_URL;
  arrayArguments[2].forEach((preview) => {
    preview.style.backgroundImage = null;
  });
  effectNone.checked = true;
  resetScale();
  removeEffectsEvents();
  resetFormTextFields();
  removeStopPaginationEvent();
  pristine.reset();
};

const resetFormObject = {
  additionalFunction: resetForm,
  arguments: [imageInput, imagePreview, effectsPreview]
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
  pristine.addValidator(hashtagsInput, validateHashtags, getHashtagsErrorMessage);
  pristine.addValidator(commentsText, validateCommentsText, getCommentsErrorMessage);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess(editingBlock, formClose, resetFormObject);
          showMessageSuccessUpload();
        })
        .catch(() => {
          showMessageErrorUpload();
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};

const initUploadForm = () => {
  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const matches = FormParameters.FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

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
      setUserFormSubmit(closePopupAfterSubmitForm);
    }
  });
};

export { initUploadForm, setUserFormSubmit };
