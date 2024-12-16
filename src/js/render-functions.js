export function renderGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags }) =>
        `<a class="gallery__item" href="${largeImageURL}">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
        </a>`
    )
    .join('');

  const galleryContainer = document.querySelector('.gallery');
  if (galleryContainer) {
    galleryContainer.insertAdjacentHTML('beforeend', markup);
  }
}
