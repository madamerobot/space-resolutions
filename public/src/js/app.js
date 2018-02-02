import RequestService from './api-request-service.js'

window.addEventListener("load", function () {
  
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
      newNode.classList.add('star-icon')
      newNode.innerHTML = "<a href='#' data-id='" + item._id + "'>⭐️ </a>"
      allResField.appendChild(newNode)

      newNode.addEventListener("click", function(){
        console.log(item.title ? item.title : 'No title provided')
      })
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
