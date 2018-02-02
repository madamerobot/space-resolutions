class RequestService {

  //==Create a new resolution==//
  createNewResolution(data) {

    this.url = '/api/resolutions'

    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Success:', response)
          resolve(response)
        })
    })
  }

  //==Request all resolutions in DB==//
  getAllResolutions() {

    this.url = "/api/resolutions"

    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          console.log('Success:', response)
          resolve(response)
        })
    })
  }

  //==Request a specific resolution by ID==//
  findOneResolution(id){

    this.url = "/api/resolutions/" + id

    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          console.log('Success:', response)
          resolve(response)
        })
    })
  }

}

export default new RequestService()