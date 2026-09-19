import { GalleryParameters } from './parameters.js';
import { toggleDisplayElement } from './class-list-helpers.js';

const socialContainer = document.querySelector(GalleryParameters.SOCIAL_CONTAINER);
const socialComments = socialContainer.querySelector(GalleryParameters.SOCIAL_COMMENTS);
const countShowComments = GalleryParameters.SHOWN_COMMENTS_LENGTH;
const countShownComments = socialContainer.querySelector(GalleryParameters.COUNT_SHOWN_COMMENTS);
const countTotalComments = socialContainer.querySelector(GalleryParameters.COUNT_TOTAL_COMMENTS);
const commentsText = socialContainer.querySelector(GalleryParameters.COMMENTS_TEXT);
const commentsLoader = socialContainer.querySelector(GalleryParameters.COMMENTS_LOADER_BUTTON);

const commentTag = GalleryParameters.COMMENT_TAG;
const commentTextTag = GalleryParameters.COMMENT_TEXT_TAG;
const commentItemClass = GalleryParameters.COMMENT_ITEM;
const textClass = GalleryParameters.COMMENT_TEXT;
let startComment = 0;
let countMaxComments = 0;

const createCommentAvatar = (avatar, name) => {
  const userAvatar = document.createElement('img');
  userAvatar.classList.add(GalleryParameters.AVATAR);
  userAvatar.setAttribute('src', avatar);
  userAvatar.setAttribute('alt', name);
  userAvatar.setAttribute('width', GalleryParameters.AVATAR_WIDTH);
  userAvatar.setAttribute('height', GalleryParameters.AVATAR_HEIGHT);
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

const getCommentWord = (value) => {
  const pr = new Intl.PluralRules('ru-RU');
  const rule = pr.select(value);
  switch (rule) {
    case 'one': return 'комментарий';
    case 'few': return 'комментария';
    default: return 'комментариев';
  }
};

const displayCountShowComments = (commentsCount) => {
  const commentWord = getCommentWord(commentsCount);
  countShownComments.textContent = commentsCount;
  commentsText.textContent = commentWord;
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
