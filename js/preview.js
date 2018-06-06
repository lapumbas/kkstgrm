(() => {
  let wd = window.data;
  window.preview = {
    showGalleryOverlayHandler: (photo) => {
      wd.galleryOverlay.querySelector('.gallery-overlay-image').src = photo.url;
      wd.galleryOverlay.querySelector('.likes-count').innerText = String(photo.likes);
      wd.galleryOverlay.querySelector('.comments-count').innerText = String(photo.comments.length);
      wd.galleryOverlay.classList.remove('hidden');
    },

    closeGalleryOverlayHandler: () => {
      wd.galleryOverlay.classList.add('hidden');
    },
  };

  let galleryOverlayCloseButton = wd.galleryOverlay.querySelector('.gallery-overlay-close');
  
  galleryOverlayCloseButton.tabIndex = '0';
  galleryOverlayCloseButton.addEventListener('click', () => {
    window.preview.closeGalleryOverlayHandler();
  });

  if (!wd.galleryOverlay.classList.contains('.hidden')) {
    document.addEventListener('keydown', evt => {
      if (evt.keyCode === 27) {
        window.preview.closeGalleryOverlayHandler();
      }
    });
    galleryOverlayCloseButton.addEventListener('keydown', evt => {
      if (evt.keyCode === 13) {
        window.preview.closeGalleryOverlayHandler();
      }
    });
  }

})();