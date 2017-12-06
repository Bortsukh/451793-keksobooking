'use strict';
var advertismentList = [];

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
var typesText = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var getRandomArrayIndex = function (arr) {
  Math.floor(Math.random() * arr.length);
};
var randomValue = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
var getRandomArray = function (arr) {
  var quantityElements = randomValue(0, arr.length - 1);
  return arr.slice(0, quantityElements);
};
for (var i = 0; i < 8; i++) { // const and func
  var titleIndex = getRandomArrayIndex(titles);
  var locationIcon = {'x': randomValue(300, 900), 'y': randomValue(100, 500)};// const
  var advertisment =
    {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': titles[titleIndex],
        'address': locationIcon.x + ', ' + locationIcon.y,
        'price': randomValue(1000, 1000000), // const
        'type': types[getRandomArrayIndex(types)],
        'rooms': randomValue(1, 5), // const
        'guests': randomValue(1, 10), // const
        'checkin': checkins[getRandomArrayIndex(checkins)],
        'checkout': checkouts[getRandomArrayIndex(checkouts)],
        'features': getRandomArray(featuresList),
        'description': '',
        'photos': []
      },
      'location': locationIcon
    };
  titles.splice(titleIndex, 1);
  advertismentList.push(advertisment);
}
var showMap = function () {
  var mapNoFaded = document.querySelector('.map');
  mapNoFaded.classList.remove('map--faded');
};

var getPin = function (data) {
  var buttonWithImageNode = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  var buttonImage = buttonWithImageNode.querySelector('img');
  buttonWithImageNode.style.left = data.location.x + 'px';
  buttonWithImageNode.style.top = data.location.y + 'px';
  buttonImage.src = data.author.avatar;
  return buttonWithImageNode;
};

var addButtons = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < 8; j++) { // const
    var buttonNode = getPin(advertismentList[j]);
    fragment.appendChild(buttonNode);
  }
  var mapPins = document.querySelector('.map__pins');
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
  var template = document.querySelector('template').content;
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
  priceCard.textContent = data.offer.price + '&#x20bd;/ночь';
  buildCard.textContent = typesText[data.offer.type];
  roomAndGuestCard.textContent = data.offer.rooms + ' для' + data.offer.guests + 'гостей';
  checkinAndCheckoutCard.textContent = 'Заезд после' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  featuresCard.innerHTML = generateFeaturesList(data.offer.features);
  descriptionCard.textContent = data.offer.description;
  avatarCard.src = data.author.avatar;
  return wholeCard;
};
var addCard = function (data) {
  var cardNode = getCard(data);
  var mapCard = document.querySelector('.map');
  var beforeElement = document.querySelector('.map__filters-container');
  mapCard.insertBefore(cardNode, beforeElement);
};

addCard(advertismentList[0]);
