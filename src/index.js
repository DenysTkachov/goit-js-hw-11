import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

loadMoreBtn.style.display = 'none';

const API_KEY = '39742873-b30b3450f220389da52a09ee2';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFE_SEARCH = true;
const PER_PAGE = 40;

let searchQuery = '';
let page = 1;

form.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  searchQuery = e.target.searchQuery.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.Failure('Please enter a search query.');
    return;
  }

  clearGallery();
  fetchImages();
});

loadMoreBtn.addEventListener('click', fetchImages);

async function fetchImages() {
  loadMoreBtn.disabled = true;

  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFE_SEARCH}&per_page=${PER_PAGE}&page=${page}`
    );
    const data = response.data.hits;

    if (data.length === 0) {
      Notiflix.Notify.Warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      appendImagesToGallery(data);
      page += 1;
      loadMoreBtn.style.display = 'block'; // Показуємо кнопку, коли є результати пошуку
    }
  } catch (error) {
    console.error(error);
    Notiflix.Notify.Failure(
      'An error occurred while fetching images. Please try again later.'
    );
  } finally {
    loadMoreBtn.disabled = false;
  }
}

function appendImagesToGallery(images) {
  const markup = images.map(image => createImageCard(image)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function createImageCard(image) {
  return `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;
}

function clearGallery() {
  gallery.innerHTML = '';
}
