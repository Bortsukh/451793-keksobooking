'use strict';
var ESCAPE = 27;
window.TYPES_TEXT = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

// functions
window.mapElement = document.querySelector('.map');
var showMap = function () {
  window.mapElement.classList.remove('map--faded');
};

window.form = document.querySelector('.notice__form');
var listFieldset = window.form.querySelectorAll('fieldset');
var activeFieldset = function () {
  for (var i = 0; i < listFieldset.length; i++) {
    listFieldset[i].disabled = false;
  }
};
var openForm = function () {
  window.form.classList.remove('notice__form--disabled');
};
var removePopup = function () {
  var popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
};
var removeClassAndPopup = function () {
  removePopup();
  deleteActiveClass();
};
var addPinListener = function (n, pinList) {
  pinList[n].addEventListener('click', function (evt) {
    removeClassAndPopup();
    evt.currentTarget.classList.add('map__pin--active');
    var popup = window.addCard(window.advertismentList[n]);
    popup.querySelector('.popup__close').addEventListener('click', function () {
      removeClassAndPopup();
      document.removeEventListener('keydown', closePopup);
    });
    document.addEventListener('keydown', closePopup);
  });
  var closePopup = function (evt) {
    if (evt.keyCode === ESCAPE) {
      removeClassAndPopup();
      document.removeEventListener('keydown', closePopup);
    }
  };
};
var deleteActiveClass = function () {
  var activePin = window.mapPins.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};
var addPinsListener = function () {
  var pinList = window.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pinList.length; i++) {
    addPinListener(i, pinList);
  }
};
var setupIsFinished = false;
var pinMain = document.querySelector('.map__pin--main');
pinMain.addEventListener('mouseup', function () {
  if (!setupIsFinished) {
    window.addButtons();
    showMap();
    openForm();
    activeFieldset();
    addPinsListener();
    setupIsFinished = true;
  }
});
