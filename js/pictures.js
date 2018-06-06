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

for (let i = 0; i < photos.length; i++) {
  let image = wd.template.cloneNode(true);
  image.userSelect = false;
  image.querySelector('img').src = photos[i].url;
  image.querySelector('.picture-likes').innerText = String(photos[i].likes);
  image.querySelector('.picture-comments').innerText = String(photos[i].comments.length);

  wd.fragment.appendChild(image);
}
wd.pictures.appendChild(wd.fragment);

let picture = wd.pictures.querySelectorAll('.picture');

picture.forEach((item, index) => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.preview.showGalleryOverlayHandler(photos[index]);
  });
});

picture.forEach((item, index) => {
  item.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) window.preview.showGalleryOverlayHandler(photos[index]);
  });
});
