(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var FormDataClass = require('./form-data-helper.js');
var FormDataHelper = new FormDataClass();

window.addEventListener("load", function () {

  this.formButton = document.querySelector('#submit-resolution');

  this.formButton.addEventListener("click", function () {
    FormDataHelper.sendData();
  });
});

},{"./form-data-helper.js":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormDataHelper = function () {
  function FormDataHelper() {
    _classCallCheck(this, FormDataHelper);
  }

  _createClass(FormDataHelper, [{
    key: 'sendData',
    value: function sendData() {

      this.url = '/api/resolutions';
      this.data = {
        title: document.querySelector('#name').value,
        author: document.querySelector('#author').value,
        description: document.querySelector('#description').value };

      fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(this.data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(function (res) {
        return res.json();
      }).catch(function (error) {
        return console.error('Error:', error);
      }).then(function (response) {
        return console.log('Success:', response);
      });
    }
  }]);

  return FormDataHelper;
}();

module.exports = FormDataHelper;

},{}]},{},[1]);
