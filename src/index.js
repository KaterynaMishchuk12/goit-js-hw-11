import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhoto } from './js/pixabay-api';
import { createMarkup } from './js/markup';

export const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.img_box a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

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
        lightbox.refresh();
      }

      refs.loadMoreBtn.classList.remove('is-hidden');
    })
    .catch(onFetchError);

  refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

  event.currentTarget.reset();
}

function onLoadMoreClick() {
  page += 1;
  fetchPhoto(keyOfSearchPhoto, page, perPage)
    .then(data => {
      const searchResults = data.hits;

      createMarkup(searchResults);
      lightbox.refresh();
    })
    .catch(onFetchError);
}

function onFetchError() {
  Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
}
