(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestService = function () {
  function RequestService() {
    _classCallCheck(this, RequestService);
  }

  _createClass(RequestService, [{
    key: 'createNewResolution',


    //==Create a new resolution==//
    value: function createNewResolution(data) {
      var _this = this;

      this.url = '/api/resolutions';

      return new Promise(function (resolve, reject) {
        fetch(_this.url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then(function (res) {
          return res.json();
        }).catch(function (error) {
          return console.error('Error:', error);
        }).then(function (response) {
          console.log('Success:', response);
          resolve(response);
        });
      });
    }

    //==Request all resolutions in DB==//

  }, {
    key: 'getAllResolutions',
    value: function getAllResolutions() {
      var _this2 = this;

      this.url = "/api/resolutions";

      return new Promise(function (resolve, reject) {
        fetch(_this2.url, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then(function (res) {
          return res.json();
        }).catch(function (error) {
          return console.error('Error', error);
        }).then(function (response) {
          console.log('Success:', response);
          resolve(response);
        });
      });
    }

    //==Request a specific resolution by ID==//

  }, {
    key: 'findOneResolution',
    value: function findOneResolution(id) {
      var _this3 = this;

      this.url = "/api/resolutions/" + id;

      return new Promise(function (resolve, reject) {
        fetch(_this3.url, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then(function (res) {
          return res.json();
        }).catch(function (error) {
          return console.error('Error', error);
        }).then(function (response) {
          console.log('Success:', response);
          resolve(response);
        });
      });
    }
  }]);

  return RequestService;
}();

exports.default = new RequestService();

},{}],2:[function(require,module,exports){
'use strict';

var _apiRequestService = require('./api-request-service.js');

var _apiRequestService2 = _interopRequireDefault(_apiRequestService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("load", function () {

  //Button Elements
  this.formButton = document.querySelector('#submit-resolution');
  this.showAllButton = document.querySelector('#display-all-resolutions');
  this.showOneButton = document.querySelector('#display-one-resolution');

  //Result Output Fields
  var notificationField = document.querySelector('.notification-field');
  var allResField = document.querySelector('#all-resolutions-result');
  var oneResField = document.querySelector('#one-resolution-result');

  //API Calls
  //Calling API endpoint to deliver all entries from DB

  _apiRequestService2.default.getAllResolutions().then(function (result) {
    result.forEach(function (item) {

      //Hacky Solution to temporarily clean DB Entries
      if (item.title == undefined) {
        item.title = 'My Resolution';
      }

      var newNode = document.createElement('div');
      newNode.classList.add('star-icon');
      newNode.innerHTML = "<a href='#' data-id='" + item._id + "'>⭐️ </a>";
      allResField.appendChild(newNode);
    });
  });

  //Sending values from form field to API endpoint to create new entry
  this.formButton.addEventListener("click", function () {

    this.data = {
      title: document.querySelector('#name').value,
      author: document.querySelector('#author').value,
      description: document.querySelector('#description').value
    };

    _apiRequestService2.default.createNewResolution(this.data).then(function (result) {
      notificationField.innerHTML = "Your abandoned resolution is now successfully floating in space.";
    });
  });

  //Calling API endpoint to deliver specific entry from DB
  this.showOneButton.addEventListener("click", function () {

    this.searchRequestID = document.querySelector('#search-req-id').value;

    _apiRequestService2.default.findOneResolution(this.searchRequestID).then(function (result) {
      oneResField.innerHTML = result;
    });
  });
});

},{"./api-request-service.js":1}]},{},[2]);
