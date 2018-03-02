import RequestService from './api-request-service.js'
import HelperFunctions from './helper-functions.js'
import Animations from './animations.js'

let allEyes = []

window.addEventListener("resize", function() {

  //Getting WindowHeight & WindowWidth on every resize,
  //so that we can dynamically calculate random pos for eyes
  HelperFunctions.assignRandomPositions(allEyes)

})

//Adding Animations
window.addEventListener('load', function(){
  Animations.hoverHands()
  Animations.hoverRocket()
})

//Adding 
window.addEventListener("load", function() {
  
  //Button Elements
  this.formButton = document.querySelector('#submit-resolution')
  this.showAllButton = document.querySelector('#display-all-resolutions')
  this.showOneButton = document.querySelector('#display-one-resolution')
  let starIconButtons = document.querySelectorAll('.star-icon')

  //Result Output Fields
  let notificationField = document.querySelector('.notification-field')
  let allResField = document.querySelector('#all-resolutions-result')
  let oneResField = document.querySelector('#one-resolution-result')

  //API Calls
  //Calling API endpoint to deliver all entries from DB on windowLoad
  RequestService.getAllResolutions().then((result => {
    result.forEach((item) => {

      let newNode = document.createElement('div')
      newNode.classList.add('eye-icon')
      newNode.innerHTML = "<button data-id='" + item._id + "'><img src='./static/eye.svg' alt='Hand Illustration Right'></button>"
      allResField.appendChild(newNode)

      newNode.addEventListener("click", function(){
        console.log(item.title ? item.title : 'No title provided')
      })

      allEyes = document.querySelectorAll('.eye-icon')
      HelperFunctions.assignRandomPositions(allEyes)
    })
  }))

  //Sending values from form field to API endpoint to create new entry
  this.formButton.addEventListener("click", function () {

    this.data = {
      author: document.querySelector('#author').value,
      description: document.querySelector('#description').value
    }

    RequestService.createNewResolution(this.data).then((result) => {
      notificationField.innerHTML = "Your abandoned resolution is now successfully floating in space."
    })

  })

  //Adding Event-Listener to each Eye-Button, to display specific resolution
  allEyes.forEach((eye) => {
    eye.addEventListener("click", function () {

      this.searchRequestID = eye.getAttribute('data-id')
      console.log(this.searchRequestID)

      RequestService.findOneResolution(this.searchRequestID).then((result => {
        oneResField.innerHTML = JSON.stringify(result)
      }))
    })

  })

  
})


