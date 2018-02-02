const FormDataClass = require('./form-data-helper.js')
const FormDataHelper = new FormDataClass()

window.addEventListener("load", function () {
  
  this.formButton = document.querySelector('#submit-resolution')

  this.formButton.addEventListener("click", function () {
    FormDataHelper.sendData()
  })

})