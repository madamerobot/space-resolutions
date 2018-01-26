(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var form = document.querySelector('form');
var formButton = document.querySelector('#submit-resolution');

window.addEventListener("load", function () {

  function sendData() {
    var xhr = new XMLHttpRequest();

    // Bind the FormData object and the form element
    var formData = new FormData(form);

    // Define what happens on successful data submission
    xhr.addEventListener("load", function (event) {
      console.log('Successful data submission');
    });

    // Define what happens in case of error
    xhr.addEventListener("error", function (event) {
      console.log('Oups! Something went wrong.');
      console.log(error);
    });

    //Wrap form values into object
    //JSON stringify it

    // Set up our request
    xhr.open("POST", "/api/resolutions");
    xhr.setRequestHeader('content-type', 'application/json');

    // The data sent is what the user provided in the form
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = formData.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        console.log(value);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    xhr.send(formData);
  }

  // ...and take over its submit event.
  formButton.addEventListener("click", function (event) {
    event.preventDefault();
    sendData();
  });
});

},{}]},{},[1]);
