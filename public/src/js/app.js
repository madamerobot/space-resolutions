import RequestService from './api-request-service.js'
import HelperFunctions from './helper-functions.js'

//Add resize event listener
//Calculate windowHeight & windowWidth
//Calculate 80% windowWidth and 30% windowHeight
//Math.random() for x and y position, with values above as minMax
//querySelect element, style left(value) and top(value)

let allEyes = []

window.addEventListener("resize", function() {

  //Getting WindowHeight & WindowWidth on every resize,
  //so that we can dynamically calculate random pos for eyes
  let windowHeight = window.innerHeight
  let windowWidth = window.innerWidth
  let elementXPosMin = 0
  let elementXPosMax = (windowHeight/100) * 40
  let elementYPosMin = (windowWidth/100) * 10
  let elementYPosMax = (windowWidth/100) * 80

  allEyes.forEach((eye) => {
    
    this.randomYPos = HelperFunctions.randomMinMax(elementYPosMin, elementYPosMax) + 'px'
    this.randomXPos = HelperFunctions.randomMinMax(elementXPosMin, elementXPosMax) + 'px'

    eye.style.left = this.randomYPos
    eye.style.top = this.randomXPos
  })
})

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
      newNode.innerHTML = "<button><img src='./static/eye.svg' alt='Hand Illustration Right'></button>"
      //<a href='#' data-id='" + item._id + "'>👁 </a>
      allResField.appendChild(newNode)

      newNode.addEventListener("click", function(){
        console.log(item.title ? item.title : 'No title provided')
      })

      allEyes = document.querySelectorAll('.eye-icon')

    })
  }))

  //Sending values from form field to API endpoint to create new entry
  this.formButton.addEventListener("click", function () {

    this.data = {
      title: document.querySelector('#name').value,
      author: document.querySelector('#author').value,
      description: document.querySelector('#description').value
    }

    RequestService.createNewResolution(this.data).then((result) => {
      notificationField.innerHTML = "Your abandoned resolution is now successfully floating in space."
    })

  })

  //Calling API endpoint to deliver specific entry from DB
  this.showOneButton.addEventListener("click", function () {
    
    this.searchRequestID = document.querySelector('#search-req-id').value

    RequestService.findOneResolution(this.searchRequestID).then((result => {
      oneResField.innerHTML = JSON.stringify(result)
    }))
  })

})
