'use strict';
(function () {
  var TIME_OUT = 10000;
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT; // 10s

    xhr.open('GET', url);
    xhr.send();
  };
})();

(function () {
  var BASE_URL = 'https://js.dump.academy/keksobooking';
  var getUrl = BASE_URL + '/data';

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    window.advertismentList = data;
  };

  window.load(getUrl, onSuccess, onError);
})();
