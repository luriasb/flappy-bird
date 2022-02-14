import BaseScene from "./BaseScene"

const WIDTH = 800
const HEIGHT = 600
const INITIAL_BIRD_POSITION = { x: WIDTH / 10, y: HEIGHT / 2 }

class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", config);

    this.bird = null
    this.pipes = null
    this.isPaused = false

    this.VELOCITY = 200
    this.PIPES_TO_RENDER = 4
    this.FLAP_VELOCITY = 300

    this.pipeVerticalDistanceRange = [150, 250]
    this.pipeHorizontalDistanceRange = [500, 600]

    this.currentDiffilculty = 'easy'
    this.difficulties = {
      'easy': {
        pipeHorizontalDistanceRange: [300, 400],
        pipeVerticalDistanceRange: [300, 400],
      },
      'normal': {
        pipeHorizontalDistanceRange: [280, 380],
        pipeVerticalDistanceRange: [250, 350],
      },
      'hard': {
        pipeHorizontalDistanceRange: [250, 350],
        pipeVerticalDistanceRange: [200, 250],
      },
    }

    this.score = 0
    this.scoreText = ''
    this.bestScoreText = ''

  }

  create() {
    // this.createBg()
    super.create()
    this.createBird()
    this.createPipes()
    this.createColliders()
    this.createScore()
    this.createPause()
    this.handleInputs()
    this.listenToEvents()

    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('bird', {start: 0, end: 19}),
      frameRate: 10,
      repeat: -1
    })

    this.currentDiffilculty = 'easy'

    this.bird.play('fly')
  }

  update() {
    this.checkGameStatus()
    this.recyclePipes()
  }

  createBg() {
    this.add.image(0, 0, "sky").setOrigin(0, 0);
  }

  createBird(){
    this.bird = this.physics.add
      .sprite(
        this.config.startPosition.x,
        this.config.startPosition.y,
        "bird"
      )
      // .setFlipX(true)
      .setScale(.7)
      .setOrigin(0, 0);
      
      this.bird.setBodySize(this.bird.width * .5, this.bird.height * .5)

      // debugger

    this.bird.body.gravity.y = 600;
  }

  createPipes(){
    this.pipes = this.physics.add.group()

    for (let i = 0; i < this.PIPES_TO_RENDER; i++) {

      const upperPipe = this.pipes.create(0, 0, 'upperPipe')
      .setImmovable(true)                  
      .setOrigin(0, 1)
      const lowerPipe = this.pipes.create(0, 0, 'lowerPipe')
      .setImmovable(true)
      .setOrigin(0, 0)

      this.placePipe(upperPipe, lowerPipe)
      
    }

    this.pipes.setVelocityX(-200)
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this)
  }

  createScore() {
    // this.score = 0
    // const bestScore = localStorage.getItem('bestScore')
    // this.scoreText = this.add.text(16, 16, `Score: ${0}`, { fontSize: '32px', fill: '#000'})
    // this.bestScoreText = this.add.text(16, 52, `Best score: ${bestScore || 0}`, { fontSize: '18px', fill: '#000'})
    this.add.image(this.screenCenter[0], this.screenCenter[1] - 225, 'scoreBackground')
    this.score = 0
    this.scoreText = this.add.text(this.screenCenter[0], this.screenCenter[1] - 225, this.score, { fontSize: '40px', fill: '#fff'}).setOrigin(.5)
  }

  createPause() {
    const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
    .setInteractive()
    .setScale(2)
    .setOrigin(1)

    pauseButton.on('pointerdown', () => {
      this.isPaused = true
      this.physics.pause()
      this.scene.pause()
      this.scene.launch('PauseScene')
    })
  }

  handleInputs(){
    this.input.on('pointerdown', this.flap, this)
    this.input.keyboard.on('keydown-SPACE', this.flap, this)
  }

  listenToEvents() {
    if(this.resumeEvent) { return }
    this.resumeEvent = this.events.on('resume', () => {
      this.initialTime = 3
      this.countDownText = this.add.text(...this.screenCenter, 'Fly in: ' + this.initialTime, this.fontOptions)
      .setOrigin(0.5)
      this.timeEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countDown,
        callbackScope: this,
        loop: true
      })
    })
  }

  countDown() {
    this.initialTime--
    this.countDownText.setText('Fly in: ' + this.initialTime)
    if(this.initialTime <= 0) {
      this.isPaused = false
      this.countDownText.setText('')
      this.physics.resume()
      this.timeEvent.remove()
    }
  }

  checkGameStatus() {
    if(this.bird.body.bottom >= this.config.height || this.bird.body.y <= 0){
      this.gameOver()
    }
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore')
    const bestScore = bestScoreText && parseInt(bestScoreText, 10)

    if(!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score)
    }
  }

  gameOver(){
    // this.bird.x = INITIAL_BIRD_POSITION.x
    // this.bird.y = INITIAL_BIRD_POSITION.y
    // this.bird.body.velocity.y = 0
    this.physics.pause()
    this.bird.setTint(0xEE4824)

    this.saveBestScore()

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart()
      },
      loop: false
    })
  }

  getRightMostPipe(){
    let rightMostX = 0
  
    this.pipes.getChildren().forEach(function(pipe){
      rightMostX = Math.max(pipe.x, rightMostX)
    })
  
    return rightMostX
  }

  placePipe(uPipe, lPipe) {
    //  pipeHorizontalDistance += 400
    const diffilculty = this.difficulties[this.currentDiffilculty]
    const rightMostX = this.getRightMostPipe()
    let pipeVerticalDistance = Phaser.Math.Between(...diffilculty.pipeVerticalDistanceRange)
    let pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - pipeVerticalDistance)
    let pipeHorizontalDistance  = Phaser.Math.Between(...diffilculty.pipeHorizontalDistanceRange)
  
    uPipe.x = rightMostX + pipeHorizontalDistance
    uPipe.y = pipeVerticalPosition
  
    lPipe.x = uPipe.x
    lPipe.y = uPipe.y + pipeVerticalDistance
  }

  recyclePipes() {
    const tempPipes = []
    this.pipes.getChildren().forEach(pipe => {
      if(pipe.getBounds().right < 0) {
        // recycle pipe
        tempPipes.push(pipe)
        if(tempPipes.length === 2) {
          this.placePipe(...tempPipes)
          this.increaseScore()
          this.saveBestScore()
          this.increaseDifficulty()
        }
      }
    })
  }

  increaseDifficulty() {
    if(this.score === 10) {
      this.currentDiffilculty = 'normal'
    }

    if(this.score === 20) {
      this.currentDiffilculty = 'hard'
    }
  }
  
  flap(){
    if(this.isPaused) { return }
    this.bird.body.velocity.y = -this.FLAP_VELOCITY
  }

  increaseScore() {
    this.score++
    this.scoreText.setText(`${this.score}`)
  }

}


export default PlayScene;
