'use strict';

// functions
window.template = document.querySelector('template').content;
var buttonWhole = window.template.querySelector('.map__pin');
window.mapPins = document.querySelector('.map__pins');
var getPin = function (data) {
  var buttonWithImageNode = buttonWhole.cloneNode(true);
  var buttonImage = buttonWithImageNode.querySelector('img');
  buttonWithImageNode.style.left = data.location.x + 'px';
  buttonWithImageNode.style.top = data.location.y + 'px';
  buttonImage.src = data.author.avatar;
  return buttonWithImageNode;
};
window.addButtons = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.QUANTITY_CARD; j++) {
    var buttonNode = getPin(window.advertismentList[j]);
    fragment.appendChild(buttonNode);
  }
  window.mapPins.appendChild(fragment);
};
