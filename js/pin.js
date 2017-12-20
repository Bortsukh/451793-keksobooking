'use strict';
(function () {
// functions
  var buttonWhole = window.map.template.querySelector('.map__pin');
  var getPin = function (data) {
    var buttonWithImageNode = buttonWhole.cloneNode(true);
    var buttonImage = buttonWithImageNode.querySelector('img');
    buttonWithImageNode.style.left = data.location.x + 'px';
    buttonWithImageNode.style.top = data.location.y + 'px';
    buttonImage.src = data.author.avatar;
    return buttonWithImageNode;
  };
  var addButtons = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.advertismentList.length; j++) {
      var buttonNode = getPin(window.advertismentList[j]);
      fragment.appendChild(buttonNode);
    }
    window.map.mapPins.appendChild(fragment);
  };
  window.pin = {
    add: function () {
      return addButtons();
    }
  };
})();
