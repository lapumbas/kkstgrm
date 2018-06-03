let photos = [];
let photosAmount = 25;

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const randomComments = (arr) => {
  let temporaryArr = [...arr];
  let result = [];
  for (let i = 0; i < randomInt(1, 3); i++) {
    result.push(temporaryArr.splice(randomInt(0, temporaryArr.length), 1).join());
  }
  return result;
}

var comments = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены,как будто их избивают.Как можно было поймать такой неудачный момент?!`
];


for (let i = 0; i < photosAmount; i++) {
  photos[i] = {};
  photos[i].url = `photos/${i+1}.jpg`;
  photos[i].likes = randomInt(15, 200);
  photos[i].comments = randomComments(comments);
}


let template = document.querySelector(`#picture-template`).content;
let pictures = document.querySelector(`.pictures`);
let fragment = document.createDocumentFragment();
let galleryOverlay = document.querySelector(`.gallery-overlay`);

const showGalleryOverlayHandler = (photo) => {
  galleryOverlay.querySelector(`.gallery-overlay-image`).src = photo.url;
  galleryOverlay.querySelector(`.likes-count`).innerText = String(photo.likes);
  galleryOverlay.querySelector(`.comments-count`).innerText = String(photo.comments.length);
  galleryOverlay.classList.remove(`hidden`);
};

const closeGalleryOverlayHandler = (photo) => {
  galleryOverlay.classList.add(`hidden`);
};

for (let i = 0; i < photos.length; i++) {
  let image = template.cloneNode(true);
  image.querySelector(`img`).src = photos[i].url;
  image.querySelector(`.picture-likes`).innerText = String(photos[i].likes);
  image.querySelector(`.picture-comments`).innerText = String(photos[i].comments.length);

  fragment.appendChild(image);
};
pictures.appendChild(fragment);

let picture = pictures.querySelectorAll('.picture');

console.log(picture);

picture.forEach((item, index) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    showGalleryOverlayHandler(photos[index]);
  });
});

picture.forEach((item, index) => {
  item.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) showGalleryOverlayHandler(photos[index]);
  });
});

let galleryOverlayCloseButton = galleryOverlay.querySelector('.gallery-overlay-close');
galleryOverlayCloseButton.tabIndex = '0';
galleryOverlayCloseButton.addEventListener('click', evt => {
  closeGalleryOverlayHandler();
});

if (!galleryOverlay.classList.contains('.hidden')) {
  document.addEventListener('keydown', evt => {
    if (evt.keyCode === 27) {
      closeGalleryOverlayHandler();
    }
  });
  galleryOverlayCloseButton.addEventListener('keydown', evt => {
    if (evt.keyCode === 13) {
      closeGalleryOverlayHandler();
    }
  })
};