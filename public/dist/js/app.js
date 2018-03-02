(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TweenLite.to(element, 1, { top: "20px", backgroundColor: "#FF0000", ease: Power2.easeOut });
var AnimationEffects = function () {
  function AnimationEffects() {
    _classCallCheck(this, AnimationEffects);

    this.leftHand = document.querySelector('.hand-left');
    this.rightHand = document.querySelector('.hand-right');
  }

  _createClass(AnimationEffects, [{
    key: 'hoverHands',
    value: function hoverHands() {
      TweenLite.to(this.leftHand, 5, { bottom: "10px", ease: Elastic.easeOut });
      TweenLite.to(this.rightHand, 5, { bottom: "10px", ease: Elastic.easeOut });
    }
  }]);

  return AnimationEffects;
}();

module.exports = new AnimationEffects();

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var _apiRequestService = require('./api-request-service.js');

var _apiRequestService2 = _interopRequireDefault(_apiRequestService);

var _helperFunctions = require('./helper-functions.js');

var _helperFunctions2 = _interopRequireDefault(_helperFunctions);

var _animations = require('./animations.js');

var _animations2 = _interopRequireDefault(_animations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allEyes = [];

window.addEventListener("resize", function () {

  //Getting WindowHeight & WindowWidth on every resize,
  //so that we can dynamically calculate random pos for eyes
  _helperFunctions2.default.assignRandomPositions(allEyes);
});

//Adding Animations
window.addEventListener('load', function () {
  _animations2.default.hoverHands();
});

//Adding 
window.addEventListener("load", function () {

  //Button Elements
  this.formButton = document.querySelector('#submit-resolution');
  this.showAllButton = document.querySelector('#display-all-resolutions');
  this.showOneButton = document.querySelector('#display-one-resolution');
  var starIconButtons = document.querySelectorAll('.star-icon');

  //Result Output Fields
  var notificationField = document.querySelector('.notification-field');
  var allResField = document.querySelector('#all-resolutions-result');
  var oneResField = document.querySelector('#one-resolution-result');

  //API Calls
  //Calling API endpoint to deliver all entries from DB on windowLoad
  _apiRequestService2.default.getAllResolutions().then(function (result) {
    result.forEach(function (item) {

      var newNode = document.createElement('div');
      newNode.classList.add('eye-icon');
      newNode.innerHTML = "<button data-id='" + item._id + "'><img src='./static/eye.svg' alt='Hand Illustration Right'></button>";
      allResField.appendChild(newNode);

      newNode.addEventListener("click", function () {
        console.log(item.title ? item.title : 'No title provided');
      });

      allEyes = document.querySelectorAll('.eye-icon');
      _helperFunctions2.default.assignRandomPositions(allEyes);
    });
  });

  //Sending values from form field to API endpoint to create new entry
  this.formButton.addEventListener("click", function () {

    this.data = {
      author: document.querySelector('#author').value,
      description: document.querySelector('#description').value
    };

    _apiRequestService2.default.createNewResolution(this.data).then(function (result) {
      notificationField.innerHTML = "Your abandoned resolution is now successfully floating in space.";
    });
  });

  //Adding Event-Listener to each Eye-Button, to display specific resolution
  allEyes.forEach(function (eye) {
    eye.addEventListener("click", function () {

      this.searchRequestID = eye.getAttribute('data-id');
      console.log(this.searchRequestID);

      _apiRequestService2.default.findOneResolution(this.searchRequestID).then(function (result) {
        oneResField.innerHTML = JSON.stringify(result);
      });
    });
  });
});

},{"./animations.js":1,"./api-request-service.js":2,"./helper-functions.js":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HelperFunctions = function () {
  function HelperFunctions() {
    _classCallCheck(this, HelperFunctions);
  }

  _createClass(HelperFunctions, [{
    key: 'createRandomXYPosition',


    //Create random Pixel value based on percentage restrictions
    value: function createRandomXYPosition(minPercentage, maxPercentage, widthOrHeight) {

      var elementPosMin = widthOrHeight / 100 * minPercentage;
      var elementPosMax = widthOrHeight / 100 * maxPercentage;

      return elementPosMin + Math.random() * (elementPosMax - elementPosMin) + 'px';
    }

    //Adding random positions to array of items

  }, {
    key: 'assignRandomPositions',
    value: function assignRandomPositions(array) {
      var _this = this;

      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;

      array.forEach(function (item) {
        item.style.left = _this.createRandomXYPosition(10, 80, windowWidth);
        item.style.top = _this.createRandomXYPosition(0, 40, windowHeight);
      });
    }
  }]);

  return HelperFunctions;
}();

exports.default = new HelperFunctions();

},{}]},{},[3]);
