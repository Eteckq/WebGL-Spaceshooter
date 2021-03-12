import { Vector3 } from '../../../node_modules/@math.gl/core/src/index'
import { gl } from '../utils/gl'
import { initTexture } from '../utils/utils'
import Rectangle from './abstract/rectangle'
import FastEnemyMissile from './projectiles/enemy/fast-enemy-missile'
import UfoEnemyMissile from './projectiles/enemy/ufo-enemy-missile'

export default class Hitbox extends Rectangle {
  constructor(width: number, height: number) {
    super(
      new Vector3(Vector3.ZERO),
      `/assets/images/Backgrounds/black.png`,
      width,
      height
    )
    document.onmousemove = (e) => {
      this.handleMouseMove(e)
    }

    document.onclick = (e) => {
      this.handleClick(e)
    }
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed
  }

  private handleClick(event: any) {
    new FastEnemyMissile(this.getPosition())
  }

  private handleMouseMove(event: any) {
    var eventDoc, doc, body

    event = event || window.event // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document
      doc = eventDoc.documentElement
      body = eventDoc.body

      event.pageX =
        event.clientX +
        ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
        ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
      event.pageY =
        event.clientY +
        ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
        ((doc && doc.clientTop) || (body && body.clientTop) || 0)
    }

    var newx = 2.0 * (event.clientX / gl.viewportWidth) - 1.0
    var newy = -(2.0 * (event.clientY / gl.viewportHeight) - 1.0)

    this.position[0] = newx
    this.position[1] = newy
  }
}

function scaleNumber(val: number) {
  return (val - 0) / (1 - 0)
}
