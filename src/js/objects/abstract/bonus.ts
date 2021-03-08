import Player from '../player'
import BoundedEntity from './bounded-entity'

export default abstract class Bonus extends BoundedEntity {
  public textureName: string

  constructor(texture: string, position: { x: number; y: number; z: number }) {
    super(`/assets/images/PNG/Power-ups/${texture}.png`, 0.03, 0.03)
    this.textureName = `/assets/images/PNG/Power-ups/${texture}.png`
    this.maxTop = 1
    this.maxBottom = 1
    this.maxLeft = 1
    this.maxRight = 1

    this.position[0] = position.x
    this.position[1] = position.y
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    let newX = this.speed * 0.02 * this.directionX
    let newY = this.speed * 0.02 * this.directionY

    this.move(newX, newY)
  }

  protected onCollision(other: Object) {
    if (other instanceof Player) {
      this.actionOnCatch()
      this.clear()
    }
  }

  abstract actionOnCatch(): void
}
