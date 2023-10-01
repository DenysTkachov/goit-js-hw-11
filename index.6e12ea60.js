const e=document.getElementById("search-form"),t=document.querySelector(".gallery"),a=document.querySelector(".load-more");// Змінні для керування пагінацією
let n=1;// Функція для виконання HTTP-запиту до Pixabay API
async function r(e){let t=`https://pixabay.com/api/?key=39742873-b30b3450f220389da52a09ee2&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=40`;try{let e=await fetch(t),a=await e.json();return a.hits;// Масив зображень
}catch(e){return console.error("Error fetching images:",e),[]}}// Функція для оновлення галереї зображень
function l(e){t.innerHTML="",e.forEach(e=>{let a=document.createElement("img");a.src=e.webformatURL,a.alt=e.tags,t.appendChild(a)})}// Обробник події для форми пошуку
e.addEventListener("submit",async e=>{e.preventDefault();let i=e.target.searchQuery.value;if(!i)return;n=1;// Скидаємо сторінку до першої при новому пошуку
let o=await r(i);0===o.length?t.innerHTML="Sorry, there are no images matching your search query. Please try again.":(l(o),a.style.display="block")}),// Обробник події для кнопки "Load more"
a.addEventListener("click",async()=>{n++;// Збільшуємо сторінку для наступного запиту
let i=e.searchQuery.value,o=await r(i);0===o.length?(// Функція для відображення повідомлення "No more results"
function(){let e=document.createElement("p");e.textContent="We're sorry, but you've reached the end of search results.",t.appendChild(e)}(),a.style.display="none"):l(o)}),function(e){let t=document.querySelector(".gallery");t.innerHTML="",e.forEach(e=>{let a=document.createElement("div");a.classList.add("photo-card");let n=document.createElement("img");n.src=e.webformatURL,n.alt=e.tags,n.loading="lazy";let r=document.createElement("div");r.classList.add("info");let l=document.createElement("p");l.classList.add("info-item"),l.innerHTML=`<b>Likes:</b> ${e.likes}`;let i=document.createElement("p");i.classList.add("info-item"),i.innerHTML=`<b>Views:</b> ${e.views}`;let o=document.createElement("p");o.classList.add("info-item"),o.innerHTML=`<b>Comments:</b> ${e.comments}`;let c=document.createElement("p");c.classList.add("info-item"),c.innerHTML=`<b>Downloads:</b> ${e.downloads}`,r.appendChild(l),r.appendChild(i),r.appendChild(o),r.appendChild(c),a.appendChild(n),a.appendChild(r),t.appendChild(a)})}(imagesData);//# sourceMappingURL=index.6e12ea60.js.map

//# sourceMappingURL=index.6e12ea60.js.map
