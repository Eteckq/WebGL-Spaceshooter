import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../game-manager'
import Player from '../player'
import Bonus from './bonus'

export default abstract class WeaponUpgrade extends Bonus {
  constructor(texture: string, position: Vector3) {
    super(position, texture)
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
