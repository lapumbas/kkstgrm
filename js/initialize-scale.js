(() => {

  window.initializeScale = (controlElement, targetElement, step, scaleMethod) => {
    controlElement.addEventListener('click', (evt) => {
      let value = parseInt(window.data.uploadResizeControlsValue.value);
      evt.preventDefault();
      if (evt.target.classList.contains('upload-resize-controls-button-inc') && value < 100) {
        scaleMethod(targetElement, value + step);
        window.data.uploadResizeControlsValue.value = `${value + step}%`;
      } else if (evt.target.classList.contains('upload-resize-controls-button-dec') && value > 0) {
        scaleMethod(targetElement, value - step);
        window.data.uploadResizeControlsValue.value = `${value - step}%`;
      }
    });
  };


})();