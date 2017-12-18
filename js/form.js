'use strict';

var MIN_LENGTH = 30;
var MAX_LENGTH = 100;
var MIN_PRICE_INPUT = 0;
var MAX_PRICE_INPUT = 1000000;
var VALUE_PRICE_INPUT = 1000;
var BUNGALO_MIN_PRICE = 0;
var FLAT_MIN_PRICE = 1000;
var HOUSE_MIN_PRICE = 5000;
var PALACE_MIN_PRICE = 10000;
var inputAddress = document.querySelector('#address');
var inputTitle = document.querySelector('#title');
var inputPrice = document.querySelector('#price');
var inputType = document.querySelector('#type');
var inputTimein = document.querySelector('#timein');
var inputTimeout = document.querySelector('#timeout');
var inputRooms = document.querySelector('#room_number');
var inputCapacity = document.querySelector('#capacity');
var form = window.form;
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

var syncronisePrice = function (typeOfBuilding, priceForDay) {
  switch (typeOfBuilding.value) {
    case 'bungalo':
      priceForDay.min = BUNGALO_MIN_PRICE;
      break;
    case 'flat':
      priceForDay.min = FLAT_MIN_PRICE;
      break;
    case 'house':
      priceForDay.min = HOUSE_MIN_PRICE;
      break;
    case 'palace':
      priceForDay.min = PALACE_MIN_PRICE;
      break;
  }
};

var syncroniseRooms = function (rooms, capacity) {
  for (var i = 0; i < capacity.options.length; i++) {
    capacity.options[i].disabled = true;
  }
  switch (rooms.value) {
    case '1':
      capacity.options[2].disabled = false;
      capacity.value = 1;
      break;
    case '2':
      capacity.options[1].disabled = false;
      capacity.options[2].disabled = false;
      break;
    case '3':
      capacity.options[0].disabled = false;
      capacity.options[1].disabled = false;
      capacity.options[2].disabled = false;
      capacity.value = 3;
      break;
    case '100':
      capacity.options[3].disabled = false;
      capacity.value = 0;
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
  if (target.value.length < MIN_LENGTH) {
    target.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
  } else {
    target.setCustomValidity('');
  }
});
