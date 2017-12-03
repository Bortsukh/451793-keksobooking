'use strict';
var advertismentList = [];
// var template = document.querySelector('template').content;
// var templateAvatar = template.querySelector('.popup__avatar').cloneNode();
// var templatePrice = template.querySelector('.popup__price');
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var types = ['flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var getRandomArrayIndex = function (arr) {
  Math.floor(Math.random() * arr.length);
};
var randomValue = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
for (var i = 0; i < 8; i++) {
  var titleIndex = getRandomArrayIndex(titles);
  var location = {'x': randomValue(300, 900), 'y': randomValue(100, 500)};
  var advertisment =
    {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': titles[titleIndex],
        'address': location.x + ', ' + location.y,
        'price': randomValue(1000, 1000000),
        'type': types[getRandomArrayIndex(types)],
        'rooms': randomValue(1, 5),
        'guests': randomValue(1, 10),
        'checkin': checkins[getRandomArrayIndex(checkins)],
        'checkout': checkouts[getRandomArrayIndex(checkouts)],
        'features': [featuresList[getRandomArrayIndex(featuresList)]], // массив строк случайной длины из ниже предложенных
        'description': '',
        'photos': []
      },
      'location': location
    };
  titles.splice(titleIndex, 1);
  advertismentList.push(advertisment);
}
var mapNoFaded = document.querySelector('.map');
mapNoFaded.classList.remove('map--faded');
var template = document.querySelector('template').content;
var pinTemplate = template.querySelector('button');
var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  var pinElement = pinTemplate.cloneNode(true);
  var data = advertismentList[i];
  pinElement.style = 'left: ' + data.location.x + 'px; ' + 'top: ' + data.location.y + 'px;';
  fragment.appendChild(pinElement);
}
var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);
