import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import { getRandomInt } from '../../utils/utils'
import BoundedEntity from './bounded-entity'

export default abstract class Bonus extends BoundedEntity {
  public description: string = 'Bonus description'
  constructor(position: Vector3, texture: string) {
    super(position, `/assets/images/Bonus/${texture}.png`, 0.03, 0.03)
    this.maxTop = 1
    this.maxBottom = 1
    this.maxLeft = 1
    this.maxRight = 1

    this.directionX = getRandomInt(-1, 1)
    this.directionY = -1
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    if (this.time > 50) {
      this.clear()
    }

    let newX = this.speed * 0.02 * this.directionX
    let newY = this.speed * 0.02 * this.directionY

    this.move(newX, newY)
  }

  abstract actionOnCatch(): void
}
