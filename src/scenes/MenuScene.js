import BaseScene from "./BaseScene"

class MenuScene extends BaseScene {

  constructor(config){
    super("MenuScene", config)

    this.menu = [
      { scene: 'PlayScene', text: 'Play'},
      // { cene: null, text: 'Exit'}
   ]
  }

  create() {
    super.create()
    this.createMenu(this.menu, this.setupMenuEvents.bind(this))
    this.createTitle()
    this.createBestScore()
  }

  createTitle() {
    this.add.image(this.screenCenter[0], this.screenCenter[1] - 200, 'gameTitle' ).setOrigin(.5);
  }

  createBestScore() {
    this.add.image(this.screenCenter[0], this.screenCenter[1] - 25, 'scoreBackground')
    this.score = 0
    const bestScore = localStorage.getItem('bestScore')
    this.bestScoreText = this.add.text(this.screenCenter[0], this.screenCenter[1] - 25, bestScore || 0, { fontSize: '40px', fill: '#fff'}).setOrigin(.5)
  }

  setupMenuEvents(menuItem) {
    const image = menuItem.image
    image.setInteractive()

    image.on('pointerover', () => {
      // image.setStyle({ fill: '#666'})
      
    })

    image.on('pointerout', () => {
      // image.setStyle({ fill: '#000'})
    })

    image.on('pointerdown', () => {
      image.setScale(.7)
    })

    image.on('pointerup', () => {
      image.setScale(.75)

      setTimeout(() => {
        menuItem.scene && this.scene.start(menuItem.scene)
      }, 100)

      if(menuItem.text === 'Exit') {
        this.game.destroy(true)
      }
    })
  }

}

export default MenuScene;