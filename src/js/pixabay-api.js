import axios from 'axios';

const API_KEY = '47523471-f6b5bf2e20bc9d436dc6d8dc4';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  if (!query || query.trim() === '') {
    throw new Error('Query cannot be empty. Please provide a search term.');
  }

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw new Error('Failed to fetch images. Please try again later.');
  }
}
