import Notiflix from 'notiflix';
import { fetchPhoto } from './js/pixabay-api';
import { createMarkup } from './js/markup';

export const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const perPage = 40;
let page = 1;
let keyOfSearchPhoto = '';

refs.loadMoreBtn.classList.add('is-hidden');
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  const { searchQuery } = event.currentTarget.elements;
  keyOfSearchPhoto = searchQuery.value.trim().toLowerCase();

  if (keyOfSearchPhoto === '') {
    Notiflix.Notify.info('Please, enter parameters for search');
    return;
  }

  fetchPhoto(keyOfSearchPhoto, page, perPage)
    .then(data => {
      const searchResults = data.hits;
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your request. Please try again'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
        createMarkup(searchResults);
        // lightbox.refresh();
      }
      if (data.totalHits > perPage) {
        refs.loadMoreBtn.classList.remove('is-hidden');
        // window.addEventListener('scroll', onInfiniteScroll);
      }
      scrollPage();
    })
    .catch(onFetchError);

  refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

  event.currentTarget.reset();
}

async function onLoadMoreClick() {
  page += 1;
  try {
    const result = await fetchPhoto(keyOfSearchPhoto, page, perPage);
    const searchResults = result.hits;
    const numberOfLastPage = Math.ceil(result.totalHits / perPage);
    createMarkup(searchResults);

    if (page === numberOfLastPage) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        'We`re soory, but you`ve reached the end of search results.'
      );
      refs.loadMoreBtn.removeEventListener('click', onLoadMoreClick);
      // window.removeEventListener('scroll', onInfiniteScroll);
    }
  } catch (error) {
    onFetchError;
  }
  //  lightbox.refresh();
}

function onFetchError() {
  Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
}

function scrollPage() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// треба допрацювати цей скрол, щоб не задвоювалися сторінки 
// при новому запиті пошуку, тому поки без нього
// function onInfiniteScroll() {
//   if (
//     window.innerHeight + window.scrollY >=
//     document.documentElement.scrollHeight
//   ) {
//     onLoadMoreClick();
//   }
// }
