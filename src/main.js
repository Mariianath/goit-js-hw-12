import { renderGallery } from './js/render-functions.js';
import { fetchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Ініціалізація глобальних змінних
const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader'); // Елемент для індикатора завантаження

let currentPage = 1;
let currentQuery = ''; // Відстеження останнього запиту

// Івенти
form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    showWarning('Please enter a search query.');
    return;
  }

  if (query !== currentQuery) {
    resetGallery(); // Скидаємо галерею лише при новому запиті
    currentPage = 1; // Скидаємо сторінку
  }
  currentQuery = query;

  try {
    toggleLoader(true); // Показуємо завантажувач

    const { hits, totalHits } = await fetchImages(query, currentPage);
    if (hits.length === 0) {
      showWarning('No images found for your query. Try again!');
      return;
    }

    showSuccess(`Found ${totalHits} images!`);
    renderGallery(hits);
  } catch (error) {
    showError(error.message || 'Something went wrong. Please try again later.');
  } finally {
    toggleLoader(false); // Ховаємо завантажувач після виконання
  }
}

function resetGallery() {
  gallery.innerHTML = '';
}

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

function showWarning(message) {
  iziToast.warning({
    title: 'Warning',
    message,
    position: 'topRight',
  });
}

function showSuccess(message) {
  iziToast.success({
    title: 'Success',
    message,
    position: 'topRight',
  });
}

function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
  });
}
