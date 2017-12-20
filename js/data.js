'use strict';
(function () {
  // constants & variables
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;
  var RANDOM_MIN_X = 300;
  var RANDOM_MAX_X = 900;
  var RANDOM_MIN_Y = 100;
  var RANDOM_MAX_Y = 500;
  var QUANTITY_CARD = 8;
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // functions
  var getRandomArrayIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };
  var randomValue = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };
  var getRandomArray = function (arr) {
    var quantityElements = randomValue(0, arr.length - 1);
    return arr.slice(0, quantityElements);
  };
  var advertismentData = [];
  for (var i = 0; i < QUANTITY_CARD; i++) {
    var titleIndex = getRandomArrayIndex(TITLES);
    var locationIcon = {'x': randomValue(RANDOM_MIN_X, RANDOM_MAX_X), 'y': randomValue(RANDOM_MIN_Y, RANDOM_MAX_Y)};
    var advertisment =
      {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },

        'offer': {
          'title': TITLES[titleIndex],
          'address': locationIcon.x + ', ' + locationIcon.y,
          'price': randomValue(MIN_PRICE, MAX_PRICE),
          'type': TYPES[getRandomArrayIndex(TYPES)],
          'rooms': randomValue(MIN_ROOMS, MAX_ROOMS),
          'guests': randomValue(MIN_GUESTS, MAX_GUESTS),
          'checkin': CHECKINS[getRandomArrayIndex(CHECKINS)],
          'checkout': CHECKOUTS[getRandomArrayIndex(CHECKOUTS)],
          'features': getRandomArray(FEATURES_LIST),
          'description': '',
          'photos': []
        },
        'location': locationIcon
      };
    TITLES.splice(titleIndex, 1);
    advertismentData.push(advertisment);
  }
  window.advertismentList = advertismentData;
})();
