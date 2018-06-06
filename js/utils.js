(() => {

  window.utils = {
    randomInt: (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    },
    
    randomComments: (arr) => {
      let temporaryArr = [...arr];
      let result = [];
      for (let i = 0; i < window.utils.randomInt(1, 3); i++) {
        result.push(temporaryArr.splice(window.utils.randomInt(0, temporaryArr.length), 1).join());
      }
      return result;
    },

    haveNoLongWords: (arr) => {
      let result = true;
      arr.forEach(item => {
        if (item.length > 20 || item[0] != '#') {
          result = false;
          console.log('no # or > 20');
        }
      });
      return result;
    },
    
    haveNoSimilarItems: (arr) => {
      let result = true;
      arr.forEach((item, index) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].toLowerCase() === item.toLowerCase() && index != i) {
            result = false;
            console.log('similar hashtag');
          }
        }
      });
      return result;
    },

  };

})();