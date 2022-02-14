import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene'
import PlayScene from './scenes/PlayScene'
import MenuScene from './scenes/MenuScene'
import ScoreScene from './scenes/ScoreScene'
import PauseScene from './scenes/PauseScene'
import Boot from './scenes/Boot'

import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';

const WIDTH = 400
const HEIGHT = 715
const INITIAL_BIRD_POSITION = { x: WIDTH / 10, y: HEIGHT / 2 }

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: INITIAL_BIRD_POSITION
}

const Scenes = [Boot, PreloadScene, MenuScene, PlayScene, ScoreScene, PauseScene]

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG))

const config = {
  // WebGL
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // debug:true
    }
  },
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: WIDTH,
    height: HEIGHT
  },
  scene: initScenes(),
  plugins: {
    global: [{
      key: 'rexWebFontLoader',
      plugin: WebFontLoaderPlugin,
      start: true
    }]
  },
}

window.game = new Phaser.Game(config)