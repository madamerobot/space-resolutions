const form = document.querySelector('form')
const formButton = document.querySelector('#submit-resolution')

window.addEventListener("load", function () {
  
  function sendData() {
    const xhr = new XMLHttpRequest();

    // Bind the FormData object and the form element
    const formData = new FormData(form);

    // Define what happens on successful data submission
    xhr.addEventListener("load", function (event) {
      console.log('Successful data submission')
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
    xhr.setRequestHeader('content-type', 'application/json')

    // The data sent is what the user provided in the form
    for (var value of formData.values()) {
      console.log(value);
    }
    xhr.send(formData);
  }

  // ...and take over its submit event.
  formButton.addEventListener("click", function (event) {
    event.preventDefault();
    sendData();
  });
});