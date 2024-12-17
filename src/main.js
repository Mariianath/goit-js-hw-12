import { renderGallery } from './js/render-functions.js';
import { fetchImages } from './js/pixabay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM Elements
const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Ініціалізація подій
form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showWarning('Please enter a search query.');
    return;
  }

  resetGallery();
  currentPage = 1;
  currentQuery = query;

  try {
    toggleLoader(true);
    const { hits, totalHits: fetchedTotalHits } = await fetchImages(currentQuery, currentPage);
    totalHits = fetchedTotalHits;

    if (hits.length === 0) {
      showWarning('No images found. Try a different search term.');
      return;
    }

    renderGalleryContent(hits);
    showSuccess(`Found ${totalHits} images!`);

    // Показати кнопку, якщо ще є результати
    if (totalHits > hits.length) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      loadMoreBtn.classList.add('is-hidden');
      showInfo("You've reached the end of search results.");
    }
  } catch (error) {
    showError('Something went wrong. Please try again.');
  } finally {
    toggleLoader(false);
  }
}

async function onLoadMore() {
  currentPage += 1;

  try {
    toggleLoader(true);
    const { hits } = await fetchImages(currentQuery, currentPage);

    renderGalleryContent(hits);

    const totalRendered = document.querySelectorAll('.gallery__item').length;
    if (totalRendered >= totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      showInfo("You've reached the end of search results.");
    }
  } catch (error) {
    showError('Something went wrong while loading more images.');
  } finally {
    toggleLoader(false);
  }
}

function renderGalleryContent(images) {
  gallery.insertAdjacentHTML('beforeend', renderGallery(images));
  lightbox.refresh();
}

function resetGallery() {
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
}

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

function showWarning(message) {
  iziToast.warning({ title: 'Warning', message, position: 'topRight' });
}

function showSuccess(message) {
  iziToast.success({ title: 'Success', message, position: 'topRight' });
}

function showError(message) {
  iziToast.error({ title: 'Error', message, position: 'topRight' });
}

function showInfo(message) {
  iziToast.info({ title: 'Info', message, position: 'topRight' });
}
