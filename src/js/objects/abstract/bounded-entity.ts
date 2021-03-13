import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import { getRandomFloat, getRandomInt, initTexture } from '../../utils/utils'
import Rectangle from './rectangle'

export default abstract class BoundedEntity extends Rectangle {
  protected speed: number = 0.5

  protected directionX: number
  protected directionY: number

  protected maxTop: number = 1
  protected maxBottom: number = 0.3
  protected maxLeft: number = 1.2
  protected maxRight: number = 1.2

  constructor(
    position: Vector3,
    texture: string,
    width: number,
    height: number
  ) {
    super(position, texture, width, height)

    this.position[0] = getRandomFloat(-0.9, 0.9)
    this.position[1] = 1.1

    this.directionY = -1
  }

  public move(newX: number, newY: number) {
    if (this.position[0] - newX > this.maxRight) {
      this.directionX = -1
    }
    if (this.position[0] - newX < -this.maxLeft) {
      this.directionX = 1
    }

    if (this.position[1] - newY > this.maxTop) {
      this.directionY = -1
    }
    if (this.position[1] - newY < -this.maxBottom) {
      this.directionY = 1
    }

    this.position[1] += newY
    this.position[0] += newX
  }
}
