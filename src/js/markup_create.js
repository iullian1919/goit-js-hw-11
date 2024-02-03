function createMarkup(array) {
  return array
    .map(
      el =>
        `<a href="${el.largeImageURL}">
            <div class="photo-card">
      <div class="thumb"><img src="${el.webformatURL}" alt="el.tags" loading="lazy"/></div>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${el.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${el.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${el.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${el.downloads}</b>
        </p>
      </div>
    </div>
        </a>
`
    )
    .join('');
}
export { createMarkup };
