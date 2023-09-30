import 'notiflix/dist/notiflix-3.2.6.min.css';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// Змінні для керування пагінацією
let page = 1;
const perPage = 40; // Кількість зображень на сторінці

// Функція для виконання HTTP-запиту до Pixabay API
async function fetchImages(query) {
  const apiKey = '39742873-b30b3450f220389da52a09ee2';
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

function createImageCards(imagesData) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Очистимо галерею перед додаванням нових карток

  imagesData.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('photo-card');

    const img = document.createElement('img');
    img.src = image.webformatURL; // URL зображення
    img.alt = image.tags; // Опис зображення
    img.loading = 'lazy';

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const likes = document.createElement('p');
    likes.classList.add('info-item');
    likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

    const views = document.createElement('p');
    views.classList.add('info-item');
    views.innerHTML = `<b>Views:</b> ${image.views}`;

    const comments = document.createElement('p');
    comments.classList.add('info-item');
    comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

    const downloads = document.createElement('p');
    downloads.classList.add('info-item');
    downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

    infoDiv.appendChild(likes);
    infoDiv.appendChild(views);
    infoDiv.appendChild(comments);
    infoDiv.appendChild(downloads);

    card.appendChild(img);
    card.appendChild(infoDiv);

    gallery.appendChild(card);
  });
}
createImageCards(imagesData);