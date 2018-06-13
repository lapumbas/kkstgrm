let wd = window.data;
let wu = window.utils;

let photos = [];
let photosAmount = 25;

for (let i = 0; i < photosAmount; i++) {
  photos[i] = {};
  photos[i].url = `photos/${i+1}.jpg`;
  photos[i].likes = wu.randomInt(15, 200);
  photos[i].comments = wu.randomComments(wd.comments);
}

function onLoad(response) {
  photos = response;
  wd.filters.classList.remove('hidden');
}

function onError(error) {
  console.error(error);
}

window.downloadData(onLoad, onError);
window.drawGallery(photos);
window.filtersChange(photos);
