import BaseScene from "./BaseScene"

class ScoreScene extends BaseScene {

  constructor(config){
    super("ScoreScene", {...config, canGoBack: true})

    this.fontOptions = {fontSize: this.fontSize + 'px', fill: '#FFF'}

  }

  create() {
    super.create()
    this.createScore()
  }

  createScore() {
    const bestScore = localStorage.getItem('bestScore')
    this.add.text(this.config.width / 2, this.config.height / 2, "Best Score:", this.fontOptions).setOrigin(.5,0)
    this.add.text(this.config.width / 2, (this.config.height / 2) + 42, bestScore, this.fontOptions).setOrigin(.5,0)
  }

}

export default ScoreScene;