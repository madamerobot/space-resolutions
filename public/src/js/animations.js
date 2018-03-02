// TweenLite.to(element, 1, { top: "20px", backgroundColor: "#FF0000", ease: Power2.easeOut });
class AnimationEffects {

  constructor(){
    this.leftHand = document.querySelector('.hand-left')
    this.rightHand = document.querySelector('.hand-right')
  }

  hoverHands() {
    TweenLite.to(this.leftHand, 5, { bottom: "10px", ease: Elastic.easeOut })
    TweenLite.to(this.rightHand, 5, { bottom: "10px", ease: Elastic.easeOut })
  }
  
}

module.exports = new AnimationEffects()