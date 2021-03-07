import Enemy from './enemy'
import Damager from '../interface/damager'
import Player from '../player'
import Rectangle from './rectangle'
import { getRandom, initTexture } from '../../utils/utils'

export default abstract class Bonus extends Rectangle {
  protected directionX: number
  protected directionY: number

  constructor(texture: string) {
    super(0.03, 0.03)

    this.texture = initTexture(
      `/assets/images/PNG/Power-ups/${texture}.png`,
      this.width,
      this.height
    )

    this.position[0] = getRandom(-1, 1)
    this.position[1] = getRandom(1, 0.5)
    this.directionX = getRandom(-1, 1)
    this.directionY = getRandom(-1, 1)
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    let speed = 0.8

    let newX = speed * 0.03 * this.directionX
    if (this.position[0] - newX < -1 || this.position[0] - newX > 1) {
      this.directionX = -this.directionX
      newX = -newX
    }

    let newY = speed * 0.01 * this.directionY
    if (this.position[1] - newY < -1 || this.position[1] - newY > 1) {
      this.directionY = -this.directionY
      newY = -newY
    }

    this.position[1] -= newY
    this.position[0] -= newX
  }

  protected onCollision(other: Object) {
    if (other instanceof Player) {
      this.actionOnCatch()
      this.clear()
    }
  }

  abstract actionOnCatch(): void
}
