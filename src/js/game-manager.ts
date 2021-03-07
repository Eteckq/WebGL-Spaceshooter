import Object from './objects/abstract/object'
import { gl } from './utils/gl'
import Rectangle from './objects/abstract/rectangle'
import Background from './objects/background'
import Player from './objects/player'
import BasicEnemyMissile from './objects/projectiles/enemy/basic-enemy-missile'
import Enemy from './objects/abstract/enemy'
import BasicMissile from './objects/projectiles/player/basic-missile'
import WaveManager from './wave-manager'
import View from './view'
import Bonus from './objects/abstract/bonus'
import PlayerManager from './player-manager'
import Hitbox from './objects/hitbox'

const DEBUG = false

export default class GameManager {
  private objectsInScene: Object[] = []

  static Instance: GameManager
  public playerManager: PlayerManager

  public waveManager: WaveManager

  private over: boolean = false

  private score: number = 0

  constructor() {
    if (!GameManager.Instance) {
      GameManager.Instance = this
    } else {
      console.error('More than one game manager instance')
    }
    this.playerManager = new PlayerManager()
    if (DEBUG) new Hitbox(0.03, 0.03)
    new Background()
    this.waveManager = new WaveManager()

    // Wait 3s before starting waves
    setTimeout(() => {
      this.waveManager.start()
    }, 3000)
  }

  public killEnemy(enemy: Enemy) {
    this.waveManager.numberOfEnemies--
    this.score += enemy.score
    View.setScore(this.score)
  }

  public gameOver() {
    this.over = true
    this.destroy()
  }

  public tick() {
    if (this.over) return
    this.checkCollisions()

    this.draw()
    this.animate()
    this.waveManager.tick()
    this.playerManager.tick()
  }

  private checkCollisions() {
    this.objectsInScene.map((object) => {
      // uncomment to debug hitboxs
      if (DEBUG)
        if (object instanceof Hitbox) {
          object.checkCollisions(this.objectsInScene)
        }
      if (object instanceof Enemy) {
        object.checkCollisions([
          ...this.objectsInScene.filter((o) => o instanceof BasicMissile),
          this.playerManager.player,
        ])
      }

      if (object instanceof Bonus) {
        object.checkCollisions([this.playerManager.player])
      }
    })

    this.playerManager.player.checkCollisions(
      this.objectsInScene.filter((o) => o instanceof BasicEnemyMissile)
    )
  }

  // Used by objects

  public addObject(object: Object) {
    this.objectsInScene.push(object)
  }

  public removeFromScene(object: Object) {
    this.objectsInScene = this.objectsInScene.filter((o) => o.id !== object.id)
  }

  // WEB GL

  private lastTime: number = 0
  private animate() {
    let timeNow = new Date().getTime()
    if (this.lastTime != 0) {
      let elapsed = timeNow - this.lastTime
      this.objectsInScene.forEach((object) => {
        object.tick(elapsed)
      })
    }
    this.lastTime = timeNow
  }

  private draw() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight)
    // eslint-disable-next-line no-bitwise
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // gl.enable(gl.BLEND)

    this.objectsInScene.forEach((object) => {
      if (object instanceof Background) {
        gl.useProgram(Background.SHADER)
      }
      if (object instanceof Rectangle) {
        gl.useProgram(Rectangle.SHADER)
      }
      if (object instanceof Player) {
        gl.useProgram(Player.SHADER)
      }

      object.sendUniformVariables()
      object.draw()
    })
  }

  public destroy() {
    this.objectsInScene.forEach((object) => {
      object.clear()
    })
  }
}
