(() => {

  var wd = window.data;
  let wu = window.utils;

  wd.uploadComment.onfocus = () => {
    wd.uploadComment.focused = true;
  };
  wd.uploadComment.onblur = () => {
    wd.uploadComment.focused = false;
  };

  const closeUploadOverlayHandler = () => {
    wd.uploadOverlay.classList.add('hidden');
  };

  const openUploadOverlayHandler = (evtOverlay) => {
    evtOverlay.preventDefault();
    evtOverlay.stopPropagation();
    wd.uploadComment.maxLength = '140';
    wd.uploadComment.required = false;
    wd.effectImagePreview.style.transform = 'scale(0.5)';

    wd.uploadOverlay.classList.remove('hidden');

    window.addEventListener('keydown', evt => {
      if (evt.keyCode === 27 && !wd.uploadComment.focused) {
        closeUploadOverlayHandler();
      }
    });

    wd.uploadOverlayClose.addEventListener('click', () => {
      closeUploadOverlayHandler();
    });

    wd.uploadOverlayClose.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 13) closeUploadOverlayHandler();
    });

    wd.uploadForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      wd.uploadHashtags.required = false;
      let hashtagsArray = (wd.uploadHashtags.value).split(' ');
      hashtagsArray.isCorrect = true;
      hashtagsArray.isCorrect = wu.haveNoSimilarItems(hashtagsArray);
      hashtagsArray.isCorrect = hashtagsArray.length > 5 ? false : (hashtagsArray.isCorrect && true);
      hashtagsArray.isCorrect = wu.haveNoLongWords(hashtagsArray);
      if (!hashtagsArray.isCorrect) {
        wd.uploadHashtags.style.border = '3px solid red';
      } else {
        wd.uploadHashtags.style.border = '3px solid green';
        wd.uploadForm.submit();
      }
    });

    wd.uploadSubmitButton.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 13) wd.uploadSubmitButton.click();
    });

    wd.uploadResizeControls.addEventListener('click', evt => {
      let value = parseInt(wd.uploadResizeControlsValue.value);
      let step = 25;
      if (evt.target.classList.contains('upload-resize-controls-button-inc') && value < 100) {
        wd.uploadResizeControlsValue.value = `${value + step}%`;
      } else if (evt.target.classList.contains('upload-resize-controls-button-dec') && value > 0) {
        wd.uploadResizeControlsValue.value = `${value - step}%`;
      }
      wd.effectImagePreview.style.transform = `scale(${parseInt(wd.uploadResizeControlsValue.value) / 100})`;
    });

    wd.uploadEffectControls.addEventListener('click', evt => {
      if (evt.target.value) {
        let filterName = wd.effectImagePreview.classList.item(1);
        if (filterName != null) {
          wd.effectImagePreview.classList.remove(filterName);
        }

        switch (evt.target.value) {
        case 'none':
          wd.currentFilterName = 'none';
          break;
        case 'chrome':
          wd.currentFilterName = 'grayscale';
          break;
        case 'sepia':
          wd.currentFilterName = 'sepia';
          break;
        case 'marvin':
          wd.currentFilterName = 'invert';
          break;
        case 'phobos':
          wd.currentFilterName = 'blur';
          break;
        case 'heat':
          wd.currentFilterName = 'brightness';
          break;
        default:
          wd.currentFilterName = 'brightness';
          break;
        }
        console.log(wd.currentFilterName);
        wd.effectImagePreview.classList.add(`effect-${evt.target.value}`);
        wd.effectImagePreview.style.filter = filter(wd.currentFilterName, 0.2);
        wd.levelPin.style.left = null;
        wd.levelValue.style.width = null;
      }
    });
  };

  wd.uploadFileInput.addEventListener('change', openUploadOverlayHandler, false);

  // level Pin *********

  wd.levelLevel.style.cursor = 'pointer';
  slider();

  function filter(name, level) {
    if (name === 'blur') {
      return `blur(${level * 3}px)`;
    } else if (name === 'brightness') {
      return `brightness(${level * 3})`;
    } else if (name === 'none') {
      return 'none';
    } else {
      return `${wd.currentFilterName}(${level})`;
    }
  }

  function slider() {

    wd.levelPin.addEventListener('mousedown', evt => {
      let pin = wd.levelPin;
      evt.preventDefault();

      let startPosition = evt.clientX;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        let shift = startPosition - moveEvt.clientX;
        startPosition = moveEvt.clientX;
        if (parseInt(pin.style.left) <= 0) {
          pin.style.left = '0px';
        } else if (parseInt(pin.style.left) >= parseInt(getComputedStyle(wd.levelLine).width)) {
          pin.style.left = getComputedStyle(wd.levelLine).width;
        }
        pin.style.left = `${pin.offsetLeft - shift}px`;
        wd.levelValue.style.width = pin.style.left;
        wd.filterLevel = parseInt(wd.levelValue.style.width) / parseInt(getComputedStyle(wd.levelLine).width);

        wd.effectImagePreview.style.filter = filter(wd.currentFilterName, wd.filterLevel);

      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  }


})();