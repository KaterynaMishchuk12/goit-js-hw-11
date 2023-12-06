import { refs } from '../index';

export function createMarkup(searchResults) {
  const photosArray = searchResults.map(
    ({
      webformatURL,
      largeImageURl,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card"><a class="gallery_link" href="${largeImageURl}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a><div class="info">
          <p class="info-item"><b>Likes: ${likes}</b></p><p class="info-item"><b>Views: ${views}</b></p>
          <p class="info-item"><b>Comments: ${comments}</b></p><p class="info-item"><b>Downloads: ${downloads}</b></p></div></div>`;
    }
  );

  refs.gallery.insertAdjacentHTML('beforeend', photosArray.join(''));
}
