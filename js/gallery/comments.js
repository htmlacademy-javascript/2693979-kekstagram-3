import { toggleDisplayElement } from '../helpers/class-list-helpers.js';

const SHOWN_COMMENTS_LENGTH = 5;
const COMMENT_TAG = 'li';
const COMMENT_TEXT_TAG = 'p';
const COMMENT_ITEM_CLASS = 'social__comment';
const TEXT_CLASS = 'social__text';
const AVATAR = 'social__picture';
const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

let startComment = 0;
let countMaxComments = 0;

const socialContainer = document.querySelector('.social');
const socialComments = socialContainer.querySelector('.social__comments');
const countShownComments = socialContainer.querySelector('.social__comment-shown-count');
const countTotalComments = socialContainer.querySelector('.social__comment-total-count');
const commentsText = socialContainer.querySelector('.social__comment-text');
const commentsLoader = socialContainer.querySelector('.comments-loader');

const createCommentAvatar = (avatar, name) => {
  const userAvatar = document.createElement('img');
  userAvatar.classList.add(AVATAR);
  userAvatar.setAttribute('src', avatar);
  userAvatar.setAttribute('alt', name);
  userAvatar.setAttribute('width', AVATAR_WIDTH);
  userAvatar.setAttribute('height', AVATAR_HEIGHT);
  return userAvatar;
};

const createCommentText = (message) => {
  const commentText = document.createElement(COMMENT_TEXT_TAG);
  commentText.classList.add(TEXT_CLASS);
  commentText.textContent = message;
  return commentText;
};

const createCommentsList = (dataComments, startShowComments, endShowComments) => {
  const commentsList = document.createDocumentFragment();

  dataComments
    .slice(startShowComments, endShowComments)
    .forEach((comment) => {
      const commentItem = document.createElement(COMMENT_TAG);
      commentItem.classList.add(COMMENT_ITEM_CLASS);

      commentItem.appendChild(createCommentAvatar(comment.avatar, comment.name));
      commentItem.appendChild(createCommentText(comment.message));

      commentsList.appendChild(commentItem);
    });

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
    countMaxComments = SHOWN_COMMENTS_LENGTH;
  } else {
    startComment += SHOWN_COMMENTS_LENGTH;
    countMaxComments = startComment + SHOWN_COMMENTS_LENGTH;
  }

  if (countMaxComments >= data.comments.length) {
    countMaxComments = data.comments.length;
    toggleDisplayElement(commentsLoader);
  }

  addCommentsFromData(data.comments, startComment, countMaxComments);
  return countMaxComments;
};

export { commentsLoader, showComments, resetCountComments, displayCountShowComments, displayCountTotalComments };
