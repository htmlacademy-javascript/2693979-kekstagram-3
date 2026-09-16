import { galleryParameters } from './parameters.js';
import { toggleDisplayElement } from './class-list-helpers.js';

const socialContainer = document.querySelector(galleryParameters.SOCIAL_CONTAINER);
const socialComments = socialContainer.querySelector(galleryParameters.SOCIAL_COMMENTS);
const countShowComments = galleryParameters.SHOWN_COMMENTS_LENGTH;
const countShownComments = socialContainer.querySelector(galleryParameters.COUNT_SHOWN_COMMENTS);
const countTotalComments = socialContainer.querySelector(galleryParameters.COUNT_TOTAL_COMMENTS);
const commentsLoader = socialContainer.querySelector(galleryParameters.COMMENTS_LOADER_BUTTON);

const commentTag = galleryParameters.COMMENT_TAG;
const commentTextTag = galleryParameters.COMMENT_TEXT_TAG;
const commentItemClass = galleryParameters.COMMENT_ITEM;
const textClass = galleryParameters.COMMENT_TEXT;
let startComment = 0;
let countMaxComments = 0;

const createCommentAvatar = (avatar, name) => {
  const userAvatar = document.createElement('img');
  userAvatar.classList.add(galleryParameters.AVATAR);
  userAvatar.setAttribute('src', avatar);
  userAvatar.setAttribute('alt', name);
  userAvatar.setAttribute('width', galleryParameters.AVATAR_WIDTH);
  userAvatar.setAttribute('height', galleryParameters.AVATAR_HEIGHT);
  return userAvatar;
};

const createCommentText = (message) => {
  const commentText = document.createElement(commentTextTag);
  commentText.classList.add(textClass);
  commentText.textContent = message;
  return commentText;
};

const createCommentsList = (dataComments, startShowComments, endShowComments) => {
  const commentsList = document.createDocumentFragment();
  for (let i = startShowComments; i < endShowComments; i++) {
    const commentItem = document.createElement(commentTag);
    commentItem.classList.add(commentItemClass);
    commentItem.appendChild(createCommentAvatar(dataComments[i].avatar, dataComments[i].name));
    commentItem.appendChild(createCommentText(dataComments[i].message));
    commentsList.appendChild(commentItem);
  }
  return commentsList;
};

const displayCountShowComments = (commentsCount) => {
  countShownComments.textContent = commentsCount;
};

const displayCountTotalComments = (commentsCount) => {
  countTotalComments.textContent = commentsCount;
};

const addCommentsFromData = (comments, firstComment, endComment) => {
  const commentsList = createCommentsList(comments, firstComment, endComment);
  socialComments.appendChild(commentsList);
};

const resetCountComments = () => {
  startComment = 0;
  countMaxComments = 0;
};

const showComments = (data, buttonLoaded) => {
  if (!buttonLoaded) {
    socialComments.textContent = '';
    countMaxComments = countShowComments;
  } else {
    startComment += countShowComments;
    countMaxComments = startComment + countShowComments;
  }

  if (countMaxComments >= data.comments.length) {
    countMaxComments = data.comments.length;
    toggleDisplayElement(commentsLoader);
  }

  addCommentsFromData(data.comments, startComment, countMaxComments);
  return countMaxComments;
};

export { commentsLoader, showComments, resetCountComments, displayCountShowComments, displayCountTotalComments };
