// TweenLite.to(element, 1, { top: "20px", backgroundColor: "#FF0000", ease: Power2.easeOut });
class AnimationEffects {

  constructor(){
    this.leftHand = document.querySelector('.hand-left')
    this.rightHand = document.querySelector('.hand-right')
    this.rocket = document.querySelector('.rocket')
    this.resolutionsField = document.querySelector('.resolutions-submit')
    this.curtainsLeft = document.querySelector('.curtains-left')
    this.curtainsRight = document.querySelector('.curtains-right')
    this.handLeft = document.querySelector('.hand-left')
    this.handRight = document.querySelector('.hand-right')
    this.hill = document.querySelector('.hill')
    this.header = document.querySelector('.intro-copy')
  }

  hoverHands(){
    TweenLite.to(this.leftHand, 5, { bottom: "10px", ease: Elastic.easeOut })
    TweenLite.to(this.rightHand, 5, { bottom: "10px", ease: Elastic.easeOut })
  }

  hoverRocket(){
    TweenLite.to(this.rocket, 3, { top: "25%", ease: Elastic.easeOut })
  }

  shootRocket(){
    TweenLite.to(this.rocket, 3, {top: "-550px", ease: Elastic.easeIn })
  }

  easeOutInputFields(){
    this.resolutionsField.style.position = 'relative'
    TweenLite.to(this.resolutionsField, 1, { bottom: "-460px", ease: Power3.easeIn })
  }

  easeOutCurtains(){
    TweenLite.to(this.curtainsLeft, 1, { left: "-400px", ease: Power3.easeIn })
    TweenLite.to(this.curtainsRight, 1, { right: "-400px", ease: Power3.easeIn })
    TweenLite.to(this.handLeft, 0.5, { left: "-920px", ease: Power3.easeIn })
    TweenLite.to(this.handRight, 0.5, { right: "-920px", ease: Power3.easeIn })
  }

  easeOutPlanet(){
    TweenLite.to(this.hill, 2.5, { bottom: "-520px", ease: Circ.easeIn })
  }

  easeOutHeader(){
    this.header.style.position = 'relative'
    TweenLite.to(this.header, 1, { top: "-280px", ease: Power3.easeIn })
  }
  
}

module.exports = new AnimationEffects()