import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {

  constructor(config){
    super("PreloadScene")
  }

  preload() {
    console.log("preload!!!!");
    
    this.load.image("sky", "assets/sky.png");
    this.load.image("bg", "assets/bg4.png");
    // this.load.image("bird", "assets/bird.png");
    this.load.spritesheet('bird', 'assets/birdSpritesheet.png', {
      frameWidth:216, frameHeight: 150
    })

    
    // this.load.image('pipe', 'assets/pipe.png')
    this.load.image('upperPipe', 'assets/obstacle1.png')
    this.load.image('lowerPipe', 'assets/obstacle2.png')
    this.load.image('playBtn', 'assets/playBtn.png')
    this.load.image('gameTitle', 'assets/gameTitle.png')
    this.load.image('scoreBackground', 'assets/scoreBackground.png')
    this.load.image('pause', 'assets/pause.png')
    this.load.image('back', 'assets/back.png')

    this.load.rexWebFont({
      google: {
          families: ['Londrina Solid']
      },
    });
  }

  create() {
    this.scene.start('MenuScene')
  }

}

export default PreloadScene;