import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let perPage = 15;
let lightbox;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery(gallery);
  loadMoreBtn.classList.add('is-hidden');

  try {
    const data = await fetchImages(query, page, perPage);
    if (!data.hits.length) {
      alert('No images found. Please try again.');
      return;
    }

    gallery.innerHTML = renderGallery(data.hits);
    lightbox = new SimpleLightbox('.gallery a').refresh();

    if (data.totalHits > perPage) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.error(error);
  }
}

async function onLoadMore() {
  page += 1;

  try {
    const data = await fetchImages(query, page, perPage);

    gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
    lightbox.refresh();

    if (page * perPage >= data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      alert("We're sorry, but you've reached the end of search results.");
    }

    scrollPage();
  } catch (error) {
    console.error(error);
  }
}

function scrollPage() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
