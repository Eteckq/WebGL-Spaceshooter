import Object from './objects/abstract/object'
import { gl } from './utils/gl'
import Rectangle from './objects/abstract/rectangle'
import Background from './objects/background'
import Player from './objects/player'
import Enemy from './objects/enemy'
import Hitbox from './objects/hitbox'

export default class GameManager {
  private objectsInScene: Object[] = []

  static Instance: GameManager

  private currentWave = 0
  private waveCooldown = 20000000

  private player: Player

  constructor() {
    if (!GameManager.Instance) {
      GameManager.Instance = this
    } else {
      console.error('More than one game manager instance')
    }

    this.player = new Player()
    new Enemy()
    // Use to debug hitboxs
    new Hitbox(0.03, 0.03)
    new Background()
  }

  public tick() {
    this.checkCollisions()

    this.draw()
    this.animate()

    this.waveCooldown--
    if (this.waveCooldown < 0) {
      this.spawnNewWave()
    }
  }

  private checkCollisions() {
    this.objectsInScene.map((object) => {
      if (object instanceof Hitbox) {
        object.checkCollisions(this.objectsInScene)
      }
      /* if (object instanceof Player) {
        object.checkCollisions(
          this.objectsInScene.filter(
            (o) => o instanceof Splat && o.tag === 'EnemyShoot'
          )
        )
      } */
    })
  }

  // Waves gestion

  private spawnNewWave() {
    this.currentWave++
    this.waveCooldown = 500 * this.currentWave * 100

    for (let i = 0; i < this.currentWave * 2; i++) {
      new Enemy()
    }
  }

  // Used by objects

  public addObject(object: Object) {
    this.objectsInScene.push(object)
  }

  public removeFromScene(object: Object) {
    this.objectsInScene.splice(this.objectsInScene.indexOf(object), 1)
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
