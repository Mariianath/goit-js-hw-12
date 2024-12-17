export function renderGallery(images, container) {
  const markup = images
    .map(({ webformatURL, largeImageURL, tags }) => {
      if (!webformatURL || !largeImageURL || !tags) return ''; 
      return `
        <a class="gallery__item" href="${largeImageURL}">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
        </a>`;
    })
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
}
