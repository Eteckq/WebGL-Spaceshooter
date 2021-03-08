import Player from '../player'
import BoundedEntity from './bounded-entity'

export default abstract class Bonus extends BoundedEntity {
  constructor(texture: string, position: { x: number; y: number; z: number }) {
    super(`/assets/images/Bonus/${texture}.png`, 0.03, 0.03)
    this.maxTop = 1
    this.maxBottom = 1
    this.maxLeft = 1
    this.maxRight = 1

    this.position[0] = position.x
    this.position[1] = position.y
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    if (this.time > 100) {
      this.clear()
    }

    let newX = this.speed * 0.02 * this.directionX
    let newY = this.speed * 0.02 * this.directionY

    this.move(newX, newY)
  }

  abstract actionOnCatch(): void
}
