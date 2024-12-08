export function renderGallery(images) {
    return images
      .map(
        ({ webformatURL, largeImageURL, tags }) =>
          `<a class="gallery__item" href="${largeImageURL}">
             <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
           </a>`
      )
      .join('');
  }
  
  export function clearGallery(container) {
    container.innerHTML = '';
  }
  