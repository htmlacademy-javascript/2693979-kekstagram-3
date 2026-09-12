import { isEscapeKey } from './util.js';
import { toggleDisplayElement, togglePageScrolling, checkHiddenElement } from './class-list-helpers.js';
import { getCommentsLoaderButton, showComments, resetCountComments, displayCountShowComments, displayCountTotalComments } from './comments-helpers.js';

const photoClassPrefix = '__img';
const photoDescriptionClass = 'social__caption';
const likesCountClass = 'likes-count';

const insertPhotoInPopup = (photo, url, description) => {
  photo.src = url;
  photo.alt = description;
};

const createPopupCloseHandlers = (popupBlock, commentsLoader, body, popupClose, showNextComments) => {
  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  const onPopupClick = () => {
    closePopup();
  };

  function closePopup () {
    toggleDisplayElement(popupBlock);
    toggleDisplayElement(commentsLoader);
    togglePageScrolling(body);
    popupClose.removeEventListener('click', onPopupClick);
    commentsLoader.removeEventListener('click', showNextComments);
    document.removeEventListener('keydown', onPopupEscKeydown);
    resetCountComments();
  }

  popupClose.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showBigPhotoPopup = (popup, photo) => {
  const popupBlock = document.querySelector(`.${ popup}`);
  toggleDisplayElement(popupBlock);
  const body = document.querySelector('body');
  togglePageScrolling(body);

  const popupImage = popupBlock
    .querySelector(`.${ popup}${ photoClassPrefix}`)
    .querySelector('img');
  insertPhotoInPopup(popupImage, photo.url, photo.description);
  popupBlock.querySelector(`.${ photoDescriptionClass}`).textContent = photo.description;
  popupBlock.querySelector(`.${ likesCountClass}`).textContent = photo.likes;

  const commentsLoader = getCommentsLoaderButton(popupBlock);
  const countStartShowComments = showComments(popupBlock, commentsLoader, photo, false);
  displayCountShowComments(popupBlock, countStartShowComments);
  displayCountTotalComments(popupBlock, photo.comments.length);

  const showNextComments = () => {
    const countShowComments = showComments(popupBlock, commentsLoader, photo, true);
    displayCountShowComments(popupBlock, countShowComments);
  };

  if (!checkHiddenElement(commentsLoader)) {
    commentsLoader.addEventListener('click', showNextComments);
  }

  const popupClose = popupBlock.querySelector(`.${ popup}__cancel`);
  createPopupCloseHandlers(popupBlock, commentsLoader, body, popupClose, showNextComments);
};


export { showBigPhotoPopup };
