const thumbnailsFragment = document.createDocumentFragment();

const createThumbnailsBlock = (container, template, data, popupEvent, popup) => {
  const thumbnailsContainer = document.querySelector(`.${ container}`);
  const thumbnailTemplate = document.querySelector(`#${ template}`).content;
  data.forEach((photo) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    const link = thumbnailElement.querySelector(`.${ template}`);
    link.href = photo.url;
    thumbnailElement.querySelector(`.${ template}__img`).src = photo.url;
    thumbnailElement.querySelector(`.${ template}__img`).alt = photo.description;
    thumbnailElement.querySelector(`.${ template}__comments`).textContent = photo.comments.length;
    thumbnailElement.querySelector(`.${ template}__likes`).textContent = photo.likes;
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
