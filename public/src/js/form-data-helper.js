class FormDataHelper {

  sendData() {

    this.url = '/api/resolutions'
    this.data = { 
        title: document.querySelector('#name').value,
        author: document.querySelector('#author').value,
        description: document.querySelector('#description').value }

    fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(this.data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
  }
  
}

module.exports = FormDataHelper