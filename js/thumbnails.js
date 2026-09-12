const imageStylePrefix = '__img';
const commentsStylePrefix = '__comments';
const likesStylePrefix = '__likes';

const thumbnailsFragment = document.createDocumentFragment();

const createThumbnailsBlock = (container, template, data, popupEvent, popup) => {
  const thumbnailsContainer = document.querySelector(`.${ container}`);
  const thumbnailTemplate = document.querySelector(`#${ template}`).content;
  data.forEach((photo) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    const link = thumbnailElement.querySelector(`.${ template}`);
    link.href = photo.url;
    thumbnailElement.querySelector(`.${ template}${ imageStylePrefix}`).
      src = photo.url;
    thumbnailElement.querySelector(`.${ template}${ imageStylePrefix}`).
      alt = photo.description;
    thumbnailElement.querySelector(`.${ template}${ commentsStylePrefix}`).
      textContent = photo.comments.length;
    thumbnailElement.querySelector(`.${ template}${ likesStylePrefix}`).
      textContent = photo.likes;
    if (popupEvent) {
      link.addEventListener('click', (evt) => {
        evt.preventDefault();
        popupEvent(popup, photo);
      });
    }
    thumbnailsFragment.appendChild(thumbnailElement);
  });
  thumbnailsContainer.appendChild(thumbnailsFragment);
};

export { createThumbnailsBlock };
