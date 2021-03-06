import Object from './objects/abstract/object'
import { gl } from './utils/gl'
import Rectangle from './objects/abstract/rectangle'
import Background from './objects/background'
import Player from './objects/player'
import WebGLManager from './webgl-manager'

export default class GameManager {
  private objectsInScene: Object[] = []

  static Instance: GameManager

  constructor() {
    if (!GameManager.Instance) {
      GameManager.Instance = this
    } else {
      console.error('More than one game manager instance')
    }

    const player = new Player()
    const back = new Background()
  }

  public addObject(object: Object) {
    this.objectsInScene.push(object)
  }

  public removeFromScene(object: Object) {
    this.objectsInScene.splice(this.objectsInScene.indexOf(object), 1)
  }

  public tick() {
    this.draw()
    this.animate()
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
