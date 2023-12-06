import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchPhoto from './js/pixabay-api';
import markup from './js/markup';

export const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.img_wrap a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
const perPage = 40;

refs.loadMoreBtn.classList.add('is-hidden');
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  const searchQuery = event.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  if (searchQuery === '') {
    Notiflix.Notify.info('Please, enter parameters for search');
  }
}
