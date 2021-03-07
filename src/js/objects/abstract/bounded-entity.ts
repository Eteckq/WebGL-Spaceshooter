import { getRandomFloat, getRandomInt, initTexture } from '../../utils/utils'
import Rectangle from './rectangle'

export default abstract class BoundedEntity extends Rectangle {
  protected speed: number = 0.5

  protected directionX: number
  protected directionY: number

  constructor(texture: string, width: number, height: number) {
    super(width, height)
    this.texture = initTexture(texture, this.width, this.height)
    this.position[0] = getRandomFloat(-1, 1)
    this.position[1] = 1.5
    this.directionX = getRandomInt(-1, 1)
    this.directionY = 1
  }

  public move(newX: number, newY: number) {
    if (this.position[0] - newX > 1.2) {
      this.directionX = -1
    }
    if (this.position[0] - newX < -1.2) {
      this.directionX = 1
    }

    if (this.position[1] - newY > 1) {
      this.directionY = -1
    }
    if (this.position[1] - newY < -0.3) {
      this.directionY = 1
    }

    this.position[1] += newY
    this.position[0] += newX
  }
}
