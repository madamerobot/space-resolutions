// TweenLite.to(element, 1, { top: "20px", backgroundColor: "#FF0000", ease: Power2.easeOut });
class AnimationEffects {

  constructor(){
    this.leftHand = document.querySelector('.hand-left')
    this.rightHand = document.querySelector('.hand-right')
    this.rocket = document.querySelector('.rocket')
  }

  hoverHands(){
    TweenLite.to(this.leftHand, 5, { bottom: "10px", ease: Elastic.easeOut })
    TweenLite.to(this.rightHand, 5, { bottom: "10px", ease: Elastic.easeOut })
  }

  hoverRocket(){
    TweenLite.to(this.rocket, 3, { top: "25%", ease: Elastic.easeOut })
  }
  
}

module.exports = new AnimationEffects()