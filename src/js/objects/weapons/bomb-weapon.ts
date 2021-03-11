import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../game-manager'
import Weapon from '../abstract/weapon'
import BombMissile from '../projectiles/player/bomb-missile'

export default class BombWeapon extends Weapon {
  constructor() {
    super()
    this.SHOOT_COOLDOWN = 80
  }

  public use(position: Vector3, level: number) {
    switch (level) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        this.shootLevel1(position)
        break
    }
  }

  private shootLevel1(position: Vector3) {
    new BombMissile(position, 0.5)
    new BombMissile(position, -0.5)
  }
}
