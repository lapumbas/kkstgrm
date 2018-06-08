(() => {
  window.showErrorPopup = function (error) {
    let errorPopup = this.document.createElement('section');
    let errorText = this.document.createElement('p');
    errorText.innerText = error;
    errorText.style.fontSize = '20px';
    errorText.style.color = 'red';



    errorPopup.style.width = '500px';
    errorPopup.style.minHeight = '500px';
    errorPopup.style.left = '50%';
    errorPopup.style.top = '50%';
    errorPopup.style.marginLeft = '-250px';
    errorPopup.style.marginTop = '-250px';
    errorPopup.style.zIndex = 100;
    errorPopup.style.display = 'flex';
    errorPopup.style.justifyContent = 'center';
    errorPopup.style.alignItems = 'center';
    errorPopup.style.backgroundColor = 'white';
    errorPopup.style.position = 'absolute';
    errorPopup.appendChild(errorText);

    document.body.appendChild(errorPopup);

  };
})();