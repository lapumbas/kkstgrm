(() => {
  window.filtersChange = function (photos) {
    let initialPhotos = [...photos];
    window.data.filters.addEventListener('change', evt => {
      switch (evt.target.id) {
      case 'filter-recommend':
        window.drawGallery(initialPhotos);
        break;
      case 'filter-popular':        
        window.drawGallery(sortPhotos(photos, 'popular'));
        break;
      case 'filter-discussed':        
        window.drawGallery(sortPhotos(photos, 'discussed'));
        break;
      case 'filter-random':     
      // console.log(randomizedArray(photos))   
        window.drawGallery(randomizedArray(photos));
        break;
      default:
        window.drawGallery(initialPhotos);
      }
    });

    const randomizedArray = (arr) => {
      let temporaryArr = [...arr];
      let result = [];
      for (let i = 0; i < arr.length; i++) {
        result.push(temporaryArr.splice(window.utils.randomInt(0, temporaryArr.length), 1)[0]);
      }
      return result;
    };

    function sortPhotos(photos, action) {      
      photos.sort((item1, item2) => {
        if ( action === 'popular') {
          if (item1['likes'] > item2['likes']) return -1;
          else if (item1['likes'] < item2['likes']) return 1; 
          else return 0;
        } else if ( action === 'discussed') {
          if (item1.comments.length > item2.comments.length) return -1;
          else if (item1.comments.length < item2.comments.length) return 1; 
          else return 0;
        }
      });      
      return photos;
    }

  };
})();