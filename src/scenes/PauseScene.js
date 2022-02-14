import BaseScene from "./BaseScene"

class PauseScene extends BaseScene {

  constructor(config){
    super("PauseScene", config)

    this.menu = [
      { scene: 'PlayScene', text: 'Continue'},
      // { cene: 'MenuScene', text: 'Exit'}
   ]
  }

  create() {
    super.create()

    this.createMenu(this.menu, this.setupMenuEvents.bind(this))

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

      if(menuItem.text && menuItem.text === 'Continue') {
        
        setTimeout(() => {
          this.scene.stop()
          this.scene.resume(menuItem.scene)
        }, 100)
      } else {
        this.scene.stop('PlayScene')
        this.scene.start('MenuScene')
      }

      

      // if(menuItem.text === 'Exit') {
      //   this.game.destroy(true)
      // }
    })

    
  }

}

export default PauseScene;