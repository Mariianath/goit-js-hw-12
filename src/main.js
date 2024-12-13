import { renderGallery } from './js/render-functions.js';
import { fetchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM Elements
const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader'); 

// Ensure all required elements are available
if (!form || !input || !gallery || !loader) {
  console.error('One or more DOM elements are missing. Check your HTML structure.');
}

let currentPage = 1;
let currentQuery = ''; 

// Add event listener if form exists
if (form) {
  form.addEventListener('submit', onSearch);
}

async function onSearch(event) {
  event.preventDefault();

  const query = input?.value.trim();
  if (!query) {
    showWarning('Please enter a search query.');
    return;
  }

  if (query !== currentQuery) {
    resetGallery(); 
    currentPage = 1; 
  }
  currentQuery = query;

  try {
    toggleLoader(true); 

    const { hits, totalHits } = await fetchImages(query, currentPage);
    if (hits.length === 0) {
      showWarning('No images found for your query. Try again!');
      return;
    }

    if (currentPage === 1) {
      showSuccess(`Found ${totalHits} images!`);
    }

    renderGallery(hits);
    currentPage += 1; 
  } catch (error) {
    showError(error.message || 'Something went wrong. Please try again later.');
  } finally {
    toggleLoader(false);
  }
}

function resetGallery() {
  if (gallery) {
    gallery.innerHTML = '';
  }
}

function toggleLoader(show) {
  if (loader) {
    loader.style.display = show ? 'block' : 'none';
  }
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
