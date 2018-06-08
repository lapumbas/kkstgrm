(() => {
  window.downloadData = function (onLoad, onError) {
    let URL = 'https://js.dump.academy/kekstagram/data';
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 404:
        onError(xhr.status);
        break;
      case 401:
        onError(xhr.status);
        break;
      case 500:
        onError(xhr.status);
        break;
      default:
        onError(xhr.status);
      }
    });

    xhr.timeout = 2000;
    xhr.addEventListener('error', () => {
      onError(xhr.status);
    });
    xhr.addEventListener('timeout', () => {
      onError(`timeout ${xhr.status}`);
    });

    xhr.open('GET', URL);
    xhr.send();

  };

  window.uploadData = function (data, onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let URL = 'https://js.dump.academy/kekstagram';

    xhr.addEventListener('load', () => {
      switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 404:
        onError(xhr.status);
        break;
      case 401:
        onError(xhr.status);
        break;
      case 405:
        onError(xhr.status);
        break;
      case 500:
        onError(xhr.status);
        break;
      default:
        onError(xhr.status);
      }
    });

    xhr.timeout = 2000;
    xhr.addEventListener('error', () => {
      onError(xhr.status);
    });
    xhr.addEventListener('timeout', () => {
      onError(`timeout ${xhr.status}`);
    });

    xhr.open('POST', URL);
    xhr.send(data);

  };
})();