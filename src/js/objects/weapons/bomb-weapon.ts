import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import Weapon from '../abstract/weapon'
import BombMissile from '../projectiles/player/bomb-missile'

export default class BombWeapon extends Weapon {
  constructor() {
    super()
    this.SHOOT_COOLDOWN = 60
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
    this.spawnMissile(position, 2)
    console.log('shoot')
  }

  private spawnMissile(position: Vector3, count: number) {
    for (let i = 0; i < count; i++) {
      new BombMissile(position)
    }
  }
}
