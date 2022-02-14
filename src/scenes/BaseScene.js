import Phaser from "phaser";

class BaseScene extends Phaser.Scene {

  constructor(key, config){
    super(key)
    this.config = config
    this.fontSize = 34
    this.lineHeight = 42
    this.screenCenter = [config.width / 2, config.height / 2]
    this.fontOptions = { fontSize: this.fontSize + 'px', fill: '#000'}
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    if(this.config.canGoBack) {
      const backButton = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
      .setOrigin(1)
      .setScale(2)
      .setInteractive()

      backButton.on('pointerup', () => {
        this.scene.start('MenuScene')
      })

    }
  }

  createMenu(menu, setupMenuEvents) {

    let lastMenuPositionY = 120

    menu.forEach(menuItem => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY]
      menuItem.image = this.add.image(...menuPosition, 'playBtn')
      .setScale(.75)
      .setOrigin(.5, .5)
      lastMenuPositionY += this.lineHeight
      setupMenuEvents(menuItem)
    })
  }

}

export default BaseScene;