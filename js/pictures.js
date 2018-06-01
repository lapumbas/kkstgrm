let photos = [];
let photosAmount = 25;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomComments(arr) {
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

function createFromTemplate() {
  let template = document.querySelector(`#picture-template`).content.querySelector(`.picture`);
  let fragment = document.createDocumentFragment();
  let pictures = document.querySelector(`.pictures`);
  for (let i = 0; i < photos.length; i++) {
    let picture = template.cloneNode(true);
    picture.querySelector(`img`).src = photos[i].url;
    picture.querySelector(`.picture-likes`).innerText = String(photos[i].likes);
    picture.querySelector(`.picture-comments`).innerText = String(photos[i].comments.length);
    fragment.appendChild(picture);
  }
  pictures.appendChild(fragment);
};

function showGalleryOverlay() {
  let galleryOverlay = document.querySelector(`.gallery-overlay`);
  galleryOverlay.classList.remove(`hidden`);
  galleryOverlay.querySelector(`.gallery-overlay-image`).src = photos[0].url;
  galleryOverlay.querySelector(`.likes-count`).innerText = String(photos[0].likes);
  galleryOverlay.querySelector(`.comments-count`).innerText = String(photos[0].comments.length);
};

createFromTemplate();
showGalleryOverlay();