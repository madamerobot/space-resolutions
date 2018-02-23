class HelperFunctions {

  //Create random Pixel value based on percentage restrictions
  createRandomXYPosition(minPercentage, maxPercentage, widthOrHeight){

    let elementPosMin = (widthOrHeight / 100) * minPercentage
    let elementPosMax = (widthOrHeight / 100) * maxPercentage

    return ( elementPosMin + (Math.random() * (elementPosMax - elementPosMin)) ) + 'px'
  }

  //Adding random positions to array of items
  assignRandomPositions(array) {

    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight

    array.forEach((item) => {
      item.style.left = this.createRandomXYPosition(10, 70, windowWidth)
      item.style.top = this.createRandomXYPosition(0, 40, windowHeight)
    })

  }

}

export default new HelperFunctions()