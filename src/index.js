import Notiflix from 'notiflix';


const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// Змінні для керування пагінацією
let page = 1;
const perPage = 40; // Кількість зображень на сторінці

// Функція для виконання HTTP-запиту до Pixabay API
async function fetchImages(query) {
  const apiKey = 'ВАШ_API_КЛЮЧ';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.hits; // Масив зображень
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

// Функція для оновлення галереї зображень
function updateGallery(images) {
  gallery.innerHTML = ''; // Очищаємо галерею

  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    gallery.appendChild(imgElement);
  });
}

// Функція для відображення повідомлення "No more results"
function showNoMoreResultsMessage() {
  const noMoreResultsMessage = document.createElement('p');
  noMoreResultsMessage.textContent =
    "We're sorry, but you've reached the end of search results.";
  gallery.appendChild(noMoreResultsMessage);
}

// Обробник події для форми пошуку
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.searchQuery.value;

  if (!query) {
    return;
  }

  page = 1; // Скидаємо сторінку до першої при новому пошуку
  const images = await fetchImages(query);

  if (images.length === 0) {
    gallery.innerHTML =
      'Sorry, there are no images matching your search query. Please try again.';
  } else {
    updateGallery(images);
    loadMoreBtn.style.display = 'block';
  }
});

// Обробник події для кнопки "Load more"
loadMoreBtn.addEventListener('click', async () => {
  page++; // Збільшуємо сторінку для наступного запиту
  const query = searchForm.searchQuery.value;
  const images = await fetchImages(query);

  if (images.length === 0) {
    showNoMoreResultsMessage();
    loadMoreBtn.style.display = 'none'; // Ховаємо кнопку "Load more"
  } else {
    updateGallery(images);
  }
});