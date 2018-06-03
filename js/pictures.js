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
  item.style.cursor = 'pointer';
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

let uploadForm = document.querySelector('#upload-select-image');
let uploadFileInput = uploadForm.querySelector('#upload-file');
let uploadFileLabel = uploadForm.querySelector('label.upload-control');
let uploadOverlay = uploadForm.querySelector('.upload-overlay');
let uploadOverlayClose = uploadForm.querySelector('.upload-form-cancel');
let uploadComment = uploadForm.querySelector('.upload-form-description');
let uploadSubmitButton = uploadForm.querySelector('.upload-form-submit');
let uploadEffectLabels = uploadForm.querySelectorAll('.upload-effect-label');
let uploadEffectInputs = uploadForm.querySelectorAll('input[name = effect]');
let effectImagePreview = uploadForm.querySelector('.effect-image-preview');
let uploadEffectControls = uploadForm.querySelector('.upload-effect-controls');
let uploadResizeControls = uploadForm.querySelector('.upload-resize-controls');
let uploadResizeControlsValue = uploadResizeControls.querySelector('.upload-resize-controls-value');
let uploadHashtags = uploadForm.querySelector('.upload-form-hashtags');

uploadComment.onfocus = () => {
  uploadComment.focused = true;
};
uploadComment.onblur = () => {
  uploadComment.focused = false
};

const closeUploadOverlayHandler = () => {
  uploadOverlay.classList.add('hidden');
};

uploadFileInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  console.log(evt)
  openUploadOverlayHandler();
});

const openUploadOverlayHandler = () => {
  uploadComment.maxLength = '140';
  uploadComment.required = false;
  effectImagePreview.style.transform = 'scale(0.5)';

  uploadOverlay.classList.remove('hidden');
  window.addEventListener('keydown', evt => {
    if (evt.keyCode === 27 && !uploadComment.focused) {
      closeUploadOverlayHandler();
    };
  });

  uploadOverlayClose.addEventListener('click', () => {
    closeUploadOverlayHandler();
  });

  uploadOverlayClose.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) closeUploadOverlayHandler();
  });

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    uploadHashtags.required = false;
    let hashtagsArray = (uploadHashtags.value).split(' ');
    hashtagsArray.isCorrect = true;
    hashtagsArray.isCorrect = haveNoSimilarItems(hashtagsArray);
    hashtagsArray.isCorrect = hashtagsArray.length > 5 ? false : (hashtagsArray.isCorrect && true);
    hashtagsArray.isCorrect = haveNoLongWords(hashtagsArray);
    if (!hashtagsArray.isCorrect) {
      uploadHashtags.style.border = '3px solid red';
    } else {
      uploadHashtags.style.border = '3px solid green';
      uploadForm.submit();
    };
  });

  uploadSubmitButton.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) uploadSubmitButton.click();
  });

  uploadResizeControls.addEventListener('click', evt => {
    let value = parseInt(uploadResizeControlsValue.value);
    let step = 25;
    if (evt.target.classList.contains('upload-resize-controls-button-inc') && value < 100) {
      uploadResizeControlsValue.value = `${value + step}%`;
    } else if (evt.target.classList.contains('upload-resize-controls-button-dec') && value > 0) {
      uploadResizeControlsValue.value = `${value - step}%`;
    };
    effectImagePreview.style.transform = `scale(${parseInt(uploadResizeControlsValue.value) / 100})`;
  });

  uploadEffectControls.addEventListener('click', evt => {
    if (evt.target.value) {
      let filterName = effectImagePreview.classList.item(1)
      if (filterName != null) {
        effectImagePreview.classList.remove(filterName);
      };
      effectImagePreview.classList.add(`effect-${evt.target.value}`);
    };
  });

};

const haveNoLongWords = (arr) => {
  let result = true;
  arr.forEach(item => {
    if (item.length > 20 || item[0] != '#') {
      result = false;
      console.log('no # or > 20');
    }
  });
  return result;
};

const haveNoSimilarItems = (arr) => {
  let result = true;
  arr.forEach((item, index) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].toLowerCase() === item.toLowerCase() && index != i) {
        result = false;
        console.log('similar hashtag');
      };
    };
  });
  return result;
};