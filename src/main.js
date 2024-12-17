import { renderGallery } from './js/render-functions.js';
import { fetchImages } from './js/pixabay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  currentQuery = input.value.trim();
  if (!currentQuery) {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search query.' });
    return;
  }
  currentPage = 1;
  resetGallery();
  await loadImages();
}

async function onLoadMore() {
  currentPage += 1;
  await loadImages();
  scrollPageSmoothly();
}

async function loadImages() {
  try {
    toggleLoader(true);
    const { hits, totalHits } = await fetchImages(currentQuery, currentPage);

    if (hits.length === 0 && currentPage === 1) {
      iziToast.warning({ title: 'Warning', message: 'No images found. Try another query.' });
      return;
    }
    renderGallery(hits, gallery);
    lightbox.refresh();

    if (hits.length < 15 || gallery.children.length >= totalHits) {
      loadMoreButton.classList.add('is-hidden');
      iziToast.info({ title: 'End', message: 'You have reached the end of search results.' });
    } else {
      loadMoreButton.classList.remove('is-hidden');
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong, try again later.' });
  } finally {
    toggleLoader(false);
  }
}

function resetGallery() {
  gallery.innerHTML = '';
  loadMoreButton.classList.add('is-hidden');
}

function toggleLoader(show) {
  loader.classList.toggle('is-hidden', !show);
}

function scrollPageSmoothly() {
  const cardHeight = document.querySelector('.gallery__item').getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
