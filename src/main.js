import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene'
import PlayScene from './scenes/PlayScene'
import MenuScene from './scenes/MenuScene'
import ScoreScene from './scenes/ScoreScene'
import PauseScene from './scenes/PauseScene'

const WIDTH = 800
const HEIGHT = 600
const INITIAL_BIRD_POSITION = { x: WIDTH / 10, y: HEIGHT / 2 }

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: INITIAL_BIRD_POSITION
}

const Scenes = [PreloadScene, MenuScene, PlayScene, ScoreScene, PauseScene]

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG))

const config = {
  // WebGL
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug:false
    }
  },
  scene: initScenes()
}

function preload() {
  
  
}


const VELOCITY = 200
const PIPES_TO_RENDER = 4
const FLAP_VELOCITY = 250


const pipeVerticalDistanceRange = [150, 250]
const pipeHorizontalDistanceRange = [500, 600]
let pipeVerticalDistance = 0
let pipeVerticalPosition = 0
let pipeHorizontalDistance = 0


let bird = null 
let pipes = null


function create() {
  
}

function update(delta, time ) {
}



new Phaser.Game(config)