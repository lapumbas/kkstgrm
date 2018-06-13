(() => {
  window.drawGallery = (photos) => {
    let wd = window.data;
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      let image = wd.template.cloneNode(true);
      image.userSelect = false;
      image.querySelector('img').src = photos[i].url;
      image.querySelector('.picture-likes').innerText = String(photos[i].likes);
      image.querySelector('.picture-comments').innerText = String(photos[i].comments.length);
      fragment.appendChild(image);
    }
    
    while (wd.pictures.firstChild) {
      wd.pictures.removeChild(wd.pictures.firstChild);
    }
    
    wd.pictures.appendChild(fragment);
    
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
  };
})();