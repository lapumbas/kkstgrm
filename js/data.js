(() => {
  window.data = {

    comments: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены,как будто их избивают.Как можно было поймать такой неудачный момент?!'
    ],

    uploadForm: document.querySelector('#upload-select-image'),
    uploadFileInput: document.querySelector('#upload-file'),
    uploadOverlay: document.querySelector('.upload-overlay'),
    uploadOverlayClose: document.querySelector('.upload-form-cancel'),
    uploadComment: document.querySelector('.upload-form-description'),
    uploadSubmitButton: document.querySelector('.upload-form-submit'),
    effectImagePreview: document.querySelector('.effect-image-preview'),
    uploadEffectControls: document.querySelector('.upload-effect-controls'),
    uploadResizeControls: document.querySelector('.upload-resize-controls'),
    uploadResizeControlsValue: document.querySelector('.upload-resize-controls-value'),
    uploadHashtags: document.querySelector('.upload-form-hashtags'),
    template: document.querySelector('#picture-template').content,
    pictures: document.querySelector('.pictures'),    
    galleryOverlay: document.querySelector('.gallery-overlay'),
    levelPin: document.querySelector('.upload-effect-level-pin'),
    levelLine: document.querySelector('.upload-effect-level-line'),
    levelValue: document.querySelector('.upload-effect-level-val'),
    levelLevel: document.querySelector('.upload-effect-level'),
    
    filters: document.querySelector('.filters'),

    filterLevel: 0.2,
    currentFilterName: 'none',

  };
})();