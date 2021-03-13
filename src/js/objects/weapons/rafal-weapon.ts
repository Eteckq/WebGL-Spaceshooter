import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import Weapon from '../abstract/weapon'
import RafalMissile from '../projectiles/player/rafal-missile'

export default class RafalWeapon extends Weapon {
  constructor() {
    super()
    this.SHOOT_COOLDOWN = 16
  }

  public use(position: Vector3, level: number) {
    this.SHOOT_COOLDOWN = 16 - level * 2
    switch (level) {
      case 4:
      case 5:
      case 6:
        this.shootLevel2(position)
        break
      case 7:
      case 8:
        this.shootLevel3(position)
        break
      default:
        this.shootLevel1(position)
        break
    }
  }

  private shootLevel1(position: Vector3) {
    new RafalMissile(position)
  }
  private shootLevel2(position: Vector3) {
    new RafalMissile(position)
    new RafalMissile(position)
  }
  private shootLevel3(position: Vector3) {
    new RafalMissile(position)
    new RafalMissile(position)
  }
}
