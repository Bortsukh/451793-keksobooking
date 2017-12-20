'use strict';
(function () {
  var TYPES_TEXT = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
  var generateFeaturesList = function (featuresArray) {
    var featuresString = '';
    for (var j = 0; j < featuresArray.length; j++) {
      featuresString += '<li class="feature feature--' + featuresArray[j] + '"></li>';
    }
    return featuresString;
  };
  var templateCard = window.map.template.querySelector('.map__card');
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
    window.map.mapElement.insertBefore(cardNode, beforeElement);
    return cardNode;
  };
  window.card = {
    get: function (data) {
      return getCard(data);
    },
    add: function (data) {
      return addCard(data);
    }
  };
})();
