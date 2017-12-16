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
var QUANTITY_CARD = 8;
var ESCAPE = 27;
var MIN_LENGTH = 30;
var MAX_LENGTH = 100;
var MIN_PRICE_INPUT = 0;
var MAX_PRICE_INPUT = 1000000;
var VALUE_PRICE_INPUT = 1000;
var BUNGALO_MIN_PRICE = 0;
var FLAT_MIN_PRICE = 1000;
var HOUSE_MIN_PRICE = 5000;
var PALACE_MIN_PRICE = 10000;

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
  for (var j = 0; j < QUANTITY_CARD; j++) {
    var buttonNode = getPin(advertismentList[j]);
    fragment.appendChild(buttonNode);
  }
  mapPins.appendChild(fragment);
};
var generateFeaturesList = function (featuresArray) {
  var featuresString = '';
  for (var j = 0; j < featuresArray.length; j++) {
    featuresString += '<li class="feature feature--' + featuresArray[j] + '"></li>';
  }
  return featuresString;
};
var templateCard = template.querySelector('.map__card');
var getCard = function (data) {
  var wholeCard = templateCard.cloneNode(true);
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
var beforeElement = document.querySelector('.map__filters-container');
var addCard = function (data) {
  var cardNode = getCard(data);
  mapElement.insertBefore(cardNode, beforeElement);
  return cardNode;
};

//

var form = document.querySelector('.notice__form');
var listFieldset = form.querySelectorAll('fieldset');
var activeFieldset = function () {
  for (var i = 0; i < listFieldset.length; i++) {
    listFieldset[i].disabled = false;
  }
};
var openForm = function () {
  form.classList.remove('notice__form--disabled');
};
var setupIsFinished = false;
var pinMain = document.querySelector('.map__pin--main');
pinMain.addEventListener('mouseup', function () {
  if (!setupIsFinished) {
    addButtons();
    showMap();
    openForm();
    activeFieldset();
    addPinsListener();
    setupIsFinished = true;
  }
});
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
    var popup = addCard(advertismentList[n]);
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

var inputAddress = document.querySelector('#address');
var inputTitle = document.querySelector('#title');
var inputPrice = document.querySelector('#price');
var inputType = document.querySelector('#type');
var inputTimein = document.querySelector('#timein');
var inputTimeout = document.querySelector('#timeout');
var inputRooms = document.querySelector('#room_number');
var inputCapacity = document.querySelector('#capacity');
form.setAttribute('action', 'https://js.dump.academy/keksobooking');
form.setAttribute('type', 'multipart/form-data');
form.setAttribute('method', 'post');
inputAddress.required = true;
inputAddress.value = 'SP';
inputAddress.setAttribute('readonly', 'readonly');
inputTitle.required = true;
inputTitle.setAttribute('minlength', MIN_LENGTH);
inputTitle.setAttribute('maxlength', MAX_LENGTH);
inputPrice.required = true;
inputPrice.min = MIN_PRICE_INPUT;
inputPrice.max = MAX_PRICE_INPUT;
inputPrice.value = VALUE_PRICE_INPUT;

var syncroniseInputs = function (select1, select2) {
  var select = select1.value;
  select2.value = select;
};

var syncronisePrice = function (param1, param2) {
  switch (param1.value) {
    case 'bungalo':
      param2.min = BUNGALO_MIN_PRICE;
      break;
    case 'flat':
      param2.min = FLAT_MIN_PRICE;
      break;
    case 'house':
      param2.min = HOUSE_MIN_PRICE;
      break;
    case 'palace':
      param2.min = PALACE_MIN_PRICE;
      break;
  }
};

var syncroniseRooms = function (rooms1, capacity1) {
  for (var i = 0; i < capacity1.options.length; i++) {
    capacity1.options[i].disabled = true;
  }
  switch (rooms1.value) {
    case '1':
      capacity1.options[2].disabled = false;
      capacity1.value = 1;
      break;
    case '2':
      capacity1.options[1].disabled = false;
      capacity1.options[2].disabled = false;
      break;
    case '3':
      capacity1.options[0].disabled = false;
      capacity1.options[1].disabled = false;
      capacity1.options[2].disabled = false;
      capacity1.value = 3;
      break;
    case '100':
      capacity1.options[3].disabled = false;
      capacity1.value = 0;
      break;
  }
};

inputTimein.addEventListener('change', function () {
  syncroniseInputs(inputTimein, inputTimeout);
});

inputTimeout.addEventListener('change', function () {
  syncroniseInputs(inputTimeout, inputTimein);
});

inputType.addEventListener('change', function () {
  syncronisePrice(inputType, inputPrice);
});

syncroniseRooms(inputRooms, inputCapacity);

inputRooms.addEventListener('change', function () {
  syncroniseRooms(inputRooms, inputCapacity);
});

inputTitle.addEventListener('invalid', function () {
  inputTitle.style.border = '1px solid tomato';
  if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
  } else if (inputTitle.validity.tooLong) {
    inputTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Пожалуйста, заполните это поле');
  } else {
    inputTitle.setCustomValidity('');
  }
});

inputPrice.addEventListener('invalid', function () {
  inputPrice.style.border = '1px solid tomato';
  if (inputPrice.validity.rangeUnderflow) {
    inputPrice.setCustomValidity('Цена меньше допустимой для вашего типа жилья');
  } else if (inputPrice.validity.rangeOverflow) {
    inputPrice.setCustomValidity('Цена не должна превышать 1 000 000 рэ');
  } else if (inputPrice.validity.valueMissing) {
    inputPrice.setCustomValidity('Пожалуйста, заполните это поле');
  } else {
    inputPrice.setCustomValidity('');
  }
});

inputTitle.addEventListener('input', function () {
  inputTitle.style.border = 'none';
});

inputPrice.addEventListener('input', function () {
  inputPrice.style.border = 'none';
});

inputTitle.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
  } else {
    target.setCustomValidity('');
  }
});
