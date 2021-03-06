import { initTexture } from '../utils/utils'
import Rectangle from './abstract/rectangle'

export default class Enemy extends Rectangle {
  protected speed: number = 0.5

  protected directionX: number
  protected directionY: number

  constructor(texture = 'Black1') {
    super(0.08, 0.08)
    this.texture = initTexture(
      `/assets/images/PNG/Enemies/enemy${texture}.png`,
      this.width,
      this.height
    )

    this.directionX = Math.random() - 0.5
    this.directionY = Math.random() - 0.5
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    let speed = 0.8

    /* if (Math.round(Math.random() * 150) === 0) {
      this.shoot()
    } */

    if (Math.round(Math.random() * 1000) === 0) {
      this.directionX = -this.directionX
    }
    if (Math.round(Math.random() * 500) === 0) {
      this.directionY = -this.directionY
    }

    let newX = speed * 0.03 * this.directionX
    if (this.position[0] - newX < -1.2 || this.position[0] - newX > 1.2) {
      this.directionX = -this.directionX
      newX = -newX
    }

    let newY = speed * 0.01 * this.directionY
    if (this.position[1] - newY < -0.5 || this.position[1] - newY > 1.2) {
      this.directionY = -this.directionY
      newY = -newY
    }

    this.position[1] -= newY
    this.position[0] -= newX
  }
}
