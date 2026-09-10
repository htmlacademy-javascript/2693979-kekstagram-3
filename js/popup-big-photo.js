import { isEscapeKey } from './util.js';

const insertPhotoInPopup = (photo, url, description) => {
  photo.src = url;
  photo.alt = description;
};

const showCountComments = (commentsLength, display, total) => {
  if (commentsLength >= 5) {
    display.textContent = 5;
  } else {
    display.textContent = commentsLength;
  }
  total.textContent = commentsLength;
};

const createCommentAvatar = (avatar, name) => {
  const userAvatar = document.createElement('img');
  userAvatar.classList.add('social__picture');
  userAvatar.setAttribute('src', avatar);
  userAvatar.setAttribute('alt', name);
  userAvatar.setAttribute('width', 35);
  userAvatar.setAttribute('height', 35);
  return userAvatar;
};

const createCommentText = (message) => {
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;
  return commentText;
};

const createComments = (dataComments) => {
  const commentsList = document.createDocumentFragment();
  dataComments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    commentItem.appendChild(createCommentAvatar(comment.avatar, comment.name));
    commentItem.appendChild(createCommentText(comment.message));
    commentsList.appendChild(commentItem);
  });
  return commentsList;
};

const createPopupCloseHandlers = (popupBlock, body, popupClose) => {
  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      closePopup();
    }
  };

  const onPopupClick = () => {
    closePopup();
  };

  function closePopup () {
    popupBlock.classList.add('hidden');
    body.classList.remove('modal-open');
    popupClose.removeEventListener('click', onPopupClick);
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  popupClose.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showBigPhotoPopup = (popup, photo) => {
  const popupBlock = document.querySelector(`.${ popup}`);
  popupBlock.classList.remove('hidden');
  const body = document.querySelector('body');
  body.classList.add('modal-open');
  const popupImage = popupBlock
    .querySelector(`.${ popup}__img`)
    .querySelector('img');
  insertPhotoInPopup(popupImage, photo.url, photo.description);
  popupBlock.querySelector('.likes-count').textContent = photo.likes;
  const displayCount = popupBlock.querySelector('.social__comment-shown-count');
  const totalCount = popupBlock.querySelector('.social__comment-total-count');
  showCountComments(photo.comments.length, displayCount, totalCount);
  popupBlock.querySelector('.social__caption').textContent = photo.description;
  const socialCommentsBlock = popupBlock.querySelector('.social__comments');
  socialCommentsBlock.textContent = '';
  const commentsList = createComments(photo.comments);
  socialCommentsBlock.appendChild(commentsList);

  const popupClose = popupBlock.querySelector(`.${ popup}__cancel`);
  createPopupCloseHandlers(popupBlock, body, popupClose);
};


export { showBigPhotoPopup };
