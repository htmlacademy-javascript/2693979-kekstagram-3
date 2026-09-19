import { toggleDisplayElement, checkHiddenElement } from '../helpers/class-list-helpers.js';
import { togglePopup, createPopupCloseHandlers } from '../helpers/popup-helpers.js';
import { commentsLoader, showComments, resetCountComments, displayCountShowComments, displayCountTotalComments } from './comments.js';

const bigPhotoContainer = document.querySelector('.big-picture');
const bigPhoto = bigPhotoContainer.querySelector('.big-picture__img').querySelector('img');
const bigPhotoDescription = bigPhotoContainer.querySelector('.social__caption');
const bigPhotoLikes = bigPhotoContainer.querySelector('.likes-count');
const bigPhotoClose = bigPhotoContainer.querySelector('.big-picture__cancel');

const resetComments = (arrayArguments) => {
  if (checkHiddenElement(arrayArguments[0])) {
    toggleDisplayElement(arrayArguments[0]);
  }
  arrayArguments[0].removeEventListener('click', arrayArguments[1]);
  resetCountComments();
};

const showBigPhoto = (galleryElement) => {
  togglePopup(bigPhotoContainer);
  bigPhoto.src = galleryElement.url;
  bigPhoto.alt = galleryElement.description;
  bigPhotoDescription.textContent = galleryElement.description;
  bigPhotoLikes.textContent = galleryElement.likes;

  const countStartShowComments = showComments(galleryElement, false);
  displayCountShowComments(countStartShowComments);
  displayCountTotalComments(galleryElement.comments.length);

  const showNextComments = () => {
    const countShowComments = showComments(galleryElement, true);
    displayCountShowComments(countShowComments);
  };

  if (!checkHiddenElement(commentsLoader)) {
    commentsLoader.addEventListener('click', showNextComments);
  }

  const resetCommentsObject = {
    additionalFunction: resetComments,
    arguments: [commentsLoader, showNextComments]
  };

  createPopupCloseHandlers(bigPhotoContainer, bigPhotoClose, resetCommentsObject);
};


export { showBigPhoto };
