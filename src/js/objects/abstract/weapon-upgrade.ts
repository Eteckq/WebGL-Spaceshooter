import Player from '../player'
import Bonus from './bonus'

export default abstract class WeaponUpgrade extends Bonus {
  constructor(texture: string, position: { x: number; y: number; z: number }) {
    super(texture, position)
  }

  protected onCollision(other: Object) {
    if (other instanceof Player) {
      this.actionOnCatch()
      this.clear()
    }
  }

  abstract actionOnCatch(): void
}
