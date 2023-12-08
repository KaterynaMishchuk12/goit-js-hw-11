import { refs } from '../index';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

export function createMarkup(searchResults) {
  const photosArray = searchResults.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card"><a class="gallery_link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a><div class="info"><p class="info-item"><b>Likes: ${likes}</b></p><p class="info-item"><b>Views: ${views}</b></p><p class="info-item"><b>Comments: ${comments}</b></p><p class="info-item"><b>Downloads: ${downloads}</b></p></div></div>`;
    }
  );
  refs.gallery.insertAdjacentHTML('beforeend', photosArray.join(''));

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
}
