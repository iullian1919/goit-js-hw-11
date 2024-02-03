import Notiflix from 'notiflix';
import { serviceGetQuestion } from './js/api';
import { createMarkup } from './js/markup_create';
import { visibilityControl } from './js/visibility_control';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

visibilityControl(refs.loadMoreBtn, 'none');
refs.form.addEventListener('submit', formSubmit);
refs.loadMoreBtn.addEventListener('click', serviceBtnClick);

let paginationCounter = 1;
let hitsCounter = 0;
let question = '';
let lightbox = null;

function formSubmit(ev) {
  ev.preventDefault();
  if (ev.currentTarget.elements.searchQuery.value.length === 0) {
    Notiflix.Notify.failure('It is can not be empty');
    return;
  }
  refs.galleryEl.innerHTML = '';
  paginationCounter = 1;
  question = ev.currentTarget.elements.searchQuery.value.split(' ').join('+');
  serviceGetQuestion(question, paginationCounter)
    .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        visibilityControl(refs.loadMoreBtn, 'none');
        return;
      }
      hitsCounter = data.totalHits;
      Notiflix.Notify.info(`Hooray! We found ${hitsCounter} images.`);
      refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      lightbox = new SimpleLightbox('.gallery a');
      visibilityControl(refs.loadMoreBtn, 'block');
      paginationCounter += 1;
    })
    .catch(err => {
      Notiflix.Notify.failure(err.message);
    });
}

function serviceBtnClick() {
  visibilityControl(refs.loadMoreBtn, 'none');

  serviceGetQuestion(question, paginationCounter)
    .then(data => {
      refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      lightbox.refresh();
      if (hitsCounter / (paginationCounter * 40) < 1) {
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
        return;
      }
      paginationCounter += 1;
      visibilityControl(refs.loadMoreBtn, 'block');
    })
    .catch(err => {
      Notiflix.Notify.failure(err.message);
    });
}

// serviceGetQuestion('cat');
