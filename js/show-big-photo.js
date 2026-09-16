import { galleryParameters } from './parameters.js';
import { toggleDisplayElement, checkHiddenElement } from './class-list-helpers.js';
import { togglePopup, createPopupCloseHandlers } from './popup-helpers.js';
import { commentsLoader, showComments, resetCountComments, displayCountShowComments, displayCountTotalComments } from './comments.js';

const bigPhotoContainer = document.querySelector(galleryParameters.BIG_PHOTO_CONTAINER);
const bigPhoto = bigPhotoContainer
  .querySelector(galleryParameters.BIG_PHOTO_IMG)
  .querySelector('img');
const socialHeader = bigPhotoContainer.querySelector(galleryParameters.SOCIAL_HEADER);
const bigPhotoAuthorAvatar = socialHeader.querySelector(`.${ galleryParameters.AVATAR}`);
const bigPhotoDescription = bigPhotoContainer.querySelector(galleryParameters.BIG_PHOTO_DESCRIPTION);
const bigPhotoLikes = bigPhotoContainer.querySelector(galleryParameters.BIG_PHOTO_LIKES);
const bigPhotoClose = bigPhotoContainer.querySelector(galleryParameters.BIG_PHOTO_CLOSE);

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
  bigPhotoAuthorAvatar.src = galleryElement.authorAvatar;
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
