class HelperFunctions {

  //Returning Ramdon Number within Min Max Range
  randomMinMax(min, max) {
    return min + Math.random() * (max - min)
  }

}

export default new HelperFunctions()