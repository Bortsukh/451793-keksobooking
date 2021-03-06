'use strict';
(function () {
  var ESCAPE = 27;
  var RESTRICTION_MIN_Y = 68;
  var RESTRICTION_MAX_Y = 468;
  var template = document.querySelector('template').content;
  var mapPins = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');
  var showMap = function () {
    mapElement.classList.remove('map--faded');
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
      var popup = window.card.add(window.advertismentList[n]);
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
    var activePin = mapPins.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };
  var addPinsListener = function () {
    var pinList = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinList.length; i++) {
      addPinListener(i, pinList);
    }
  };

  var setupIsFinished = false;
  var pinMain = document.querySelector('.map__pin--main');
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var pinMainLocationY = pinMain.offsetTop - shift.y;
      var pinMainLocationX = pinMain.offsetLeft - shift.x;
      if (pinMainLocationY < RESTRICTION_MIN_Y) {
        pinMainLocationY = RESTRICTION_MIN_Y;
      } else if (pinMainLocationY > RESTRICTION_MAX_Y) {
        pinMainLocationY = RESTRICTION_MAX_Y;
      } else {
        pinMain.style.top = pinMainLocationY + 'px';
      }
      pinMain.style.left = pinMainLocationX + 'px';

      window.form.setAddressValue(pinMainLocationX, pinMainLocationY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!setupIsFinished) {
        showMap();
        window.form.open();
        window.form.activate();
        window.backend.get(onSuccess, onError);
        setupIsFinished = true;
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onError = function (message) {
    window.errorhandler.showError(message);
  };

  var onSuccess = function (data) {
    window.advertismentList = data;
    window.pin.add();
    addPinsListener();
  };

  // window.backend.get(onSuccess, onError);

  window.map = {
    template: template,
    mapPins: mapPins,
    mapElement: mapElement
  };
})();
