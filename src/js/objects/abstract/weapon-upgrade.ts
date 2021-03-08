import GameManager from '../../game-manager'
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

  actionOnCatch(): void {
    GameManager.Instance.playerManager.weaponManager.pushUpgrade(this)
  }
}
