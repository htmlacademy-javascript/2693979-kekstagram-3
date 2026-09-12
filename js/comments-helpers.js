import { toggleDisplayElement } from './class-list-helpers.js';

const avatarWidth = 35;
const avatarHeight = 35;
const commentTag = 'li';
const commentTextTag = 'p';
const commentsListClass = 'social__comments';
const commentItemClass = 'social__comment';
const avatarClass = 'social__picture';
const textClass = 'social__text';
const showCommentsClass = 'social__comment-shown-count';
const totalCommentsClass = 'social__comment-total-count';
const loaderCommentsButton = 'comments-loader';
const countShowComments = 5;
let startComment = 0;
let countMaxComments = 0;

const createCommentAvatar = (avatar, name) => {
  const userAvatar = document.createElement('img');
  userAvatar.classList.add(avatarClass);
  userAvatar.setAttribute('src', avatar);
  userAvatar.setAttribute('alt', name);
  userAvatar.setAttribute('width', avatarWidth);
  userAvatar.setAttribute('height', avatarHeight);
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

const displayCountShowComments = (commentsBlock, commentsCount) => {
  const showCount = commentsBlock.querySelector(`.${ showCommentsClass}`);
  showCount.textContent = commentsCount;
};

const displayCountTotalComments = (commentsBlock, commentsCount) => {
  const totalCount = commentsBlock.querySelector(`.${ totalCommentsClass}`);
  totalCount.textContent = commentsCount;
};

const getCommentsLoaderButton = (commentsBlock) => commentsBlock.
  querySelector(`.${ loaderCommentsButton}`);

const addCommentsFromData = (socialCommentsBlock, comments, firstComment, endComment) => {
  const commentsList = createCommentsList(comments, firstComment, endComment);
  socialCommentsBlock.appendChild(commentsList);
};

const resetCountComments = () => {
  startComment = 0;
  countMaxComments = 0;
};

const showComments = (commentsBlock, commentsLoader, data, buttonLoaded) => {
  const socialCommentsBlock = commentsBlock.
    querySelector(`.${ commentsListClass}`);

  if (!buttonLoaded) {
    socialCommentsBlock.textContent = '';
    countMaxComments = countShowComments;
  } else {
    startComment += countShowComments;
    countMaxComments = startComment + countShowComments;
  }

  if (countMaxComments >= data.comments.length) {
    countMaxComments = data.comments.length;
    toggleDisplayElement(commentsLoader);
  }

  addCommentsFromData(socialCommentsBlock, data.comments, startComment, countMaxComments);
  return countMaxComments;
};

export { getCommentsLoaderButton, showComments, resetCountComments, displayCountShowComments, displayCountTotalComments };
