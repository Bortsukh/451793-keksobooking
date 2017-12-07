'use strict';
var advertismentList = [];
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
var QUNTITY_CARD = 8;
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
var TYPES_TEXT = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
var getData = function () {
  var advertismentData = [];
  for (var i = 0; i < QUNTITY_CARD; i++) { // const and func
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
  return advertismentData;
};
advertismentList = getData();
var mapElement = document.querySelector('.map');
var showMap = function () {
  mapElement.classList.remove('map--faded');
};
var template = document.querySelector('template').content;
var buttonWhole = template.querySelector('.map__pin');
var getPin = function (data) {
  var buttonWithImageNode = buttonWhole.cloneNode(true);
  var buttonImage = buttonWithImageNode.querySelector('img');
  buttonWithImageNode.style.left = data.location.x + 'px';
  buttonWithImageNode.style.top = data.location.y + 'px';
  buttonImage.src = data.author.avatar;
  return buttonWithImageNode;
};
var mapPins = document.querySelector('.map__pins');
var addButtons = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < QUNTITY_CARD; j++) { // const
    var buttonNode = getPin(advertismentList[j]);
    fragment.appendChild(buttonNode);
  }
  mapPins.appendChild(fragment);
};

showMap();
addButtons();

var generateFeaturesList = function (featuresArray) {
  var featuresString = '';
  for (var j = 0; j < featuresArray.length; j++) {
    featuresString += '<li class="feature feature--' + featuresArray[j] + '"></li>';
  }
  return featuresString;
};
var getCard = function (data) {
  var wholeCard = template.querySelector('.map__card').cloneNode(true);
  var titleCard = wholeCard.querySelector('h3');
  var addressCard = wholeCard.querySelector('p small');
  var priceCard = wholeCard.querySelector('.popup__price');
  var buildCard = wholeCard.querySelector('h4');
  var roomAndGuestCard = wholeCard.querySelector('h4 + p');
  var checkinAndCheckoutCard = wholeCard.querySelector('h4 + p + p');
  var featuresCard = wholeCard.querySelector('.popup__features');
  var descriptionCard = wholeCard.querySelector('ul + p');
  var avatarCard = wholeCard.querySelector('.popup__avatar');
  titleCard.textContent = data.offer.title;
  addressCard.textContent = data.offer.address;
  priceCard.innerHTML = data.offer.price + '&#x20bd;/ночь';
  buildCard.textContent = TYPES_TEXT[data.offer.type];
  roomAndGuestCard.textContent = data.offer.rooms + ' для ' + data.offer.guests + ' гостей';
  checkinAndCheckoutCard.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  featuresCard.innerHTML = generateFeaturesList(data.offer.features);
  descriptionCard.textContent = data.offer.description;
  avatarCard.src = data.author.avatar;
  return wholeCard;
};
var mapCard = document.querySelector('.map');
var addCard = function (data) {
  var cardNode = getCard(data);
  var beforeElement = document.querySelector('.map__filters-container');
  mapCard.insertBefore(cardNode, beforeElement);
};

addCard(advertismentList[0]);
