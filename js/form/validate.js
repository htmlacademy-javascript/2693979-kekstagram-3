const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const ERROR_MESSAGE_1 = 'Хештегов должно быть не более пяти.<br>';
const ERROR_MESSAGE_2 = 'Не должно быть одинаковых хештегов (хештеги нечувствительны к регистру).<br>';
const ERROR_MESSAGE_3 = 'Хэштеги должны начинаться с символа #.<br>';
const ERROR_MESSAGE_4 = 'Хештег не должен состоять из одной #.<br>';
const ERROR_MESSAGE_5 = 'Максимальная длина хештега - 20 символов, включая #.<br>';
const ERROR_MESSAGE_6 = 'Хештег после # должен содержать только буквы и числа<br>';
const ERROR_MESSAGE_7 = `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`;

let errorHashtagsMessage = '';

const hasDuplicatesIgnoreCase = (hashtags) => {
  const normalizedHashtags = hashtags.map((item) =>
    typeof item === 'string' ? item.toLocaleLowerCase() : item
  );
  return new Set(normalizedHashtags).size !== normalizedHashtags.length;
};

const validateHashtags = (value) => {
  const hashtags = value.split(' ').filter((part) => part.length > 0);
  const regexp = /^#[a-zа-яё0-9]+$/i;

  const errors = new Set();
  let isValid = false;

  if (hashtags.length > MAX_HASHTAGS) {
    errors.add(ERROR_MESSAGE_1);
    isValid = true;
  }

  if (hasDuplicatesIgnoreCase(hashtags)) {
    errors.add(ERROR_MESSAGE_2);
    isValid = true;
  }

  hashtags.forEach((hashtag) => {
    if (hashtag[0] !== '#' && hashtag !== '') {
      errors.add(ERROR_MESSAGE_3);
      isValid = true;
    }
    if (hashtag[0] === '#' && hashtag.length === 1) {
      errors.add(ERROR_MESSAGE_4);
      isValid = true;
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      errors.add(ERROR_MESSAGE_5);
      isValid = true;
    }
    if (hashtag[0] === '#' && !regexp.test(hashtag)) {
      errors.add(ERROR_MESSAGE_6);
      isValid = true;
    }
  });

  errorHashtagsMessage = Array.from(errors).join('');

  return !isValid;
};

const validateCommentsText = (value) => !(value.length > MAX_COMMENT_LENGTH);

const getHashtagsErrorMessage = () => {
  const error = errorHashtagsMessage;
  errorHashtagsMessage = '';
  return error;
};

const getCommentsErrorMessage = () => ERROR_MESSAGE_7;

export {validateHashtags, validateCommentsText, getHashtagsErrorMessage, getCommentsErrorMessage};
