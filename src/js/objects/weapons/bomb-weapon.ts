import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../game-manager'
import Weapon from '../abstract/weapon'
import BombMissile from '../projectiles/player/bomb-missile'

export default class BombWeapon extends Weapon {
  constructor() {
    super()
    this.SHOOT_COOLDOWN = 120
  }

  public use(position: Vector3, level: number) {
    switch (level) {
      case 1:
        this.shootLevel1(position)
        break
      case 2:
        this.shootLevel2(position)
        break
      case 3:
        this.shootLevel3(position)
        break
      case 4:
        this.shootLevel4(position)
        break
      case 5:
        this.shootLevel5(position)
        break
      case 6:
        this.shootLevel6(position)
        break
      case 7:
        this.shootLevel7(position)
        break
      case 8:
        this.shootLevel8(position)
        break
    }
  }

  private shootLevel1(position: Vector3) {
    new BombMissile(position, 0.5)
    new BombMissile(position, -0.5)
  }

  private shootLevel2(position: Vector3) {
    this.shootLevel1(position)
    this.SHOOT_COOLDOWN = 100
  }

  private shootLevel3(position: Vector3) {
    this.shootLevel1(position)
    this.SHOOT_COOLDOWN = 70
  }

  private shootLevel4(position: Vector3) {
    new BombMissile(position, 0.3)
    new BombMissile(position, -0.3)
    new BombMissile(position, 0.6)
    new BombMissile(position, -0.6)
    this.SHOOT_COOLDOWN = 100
  }

  private shootLevel5(position: Vector3) {
    this.shootLevel4(position)
    this.SHOOT_COOLDOWN = 70
  }

  private shootLevel6(position: Vector3) {
    this.shootLevel4(position)
    this.SHOOT_COOLDOWN = 50
  }

  private shootLevel7(position: Vector3) {
    this.shootLevel4(position)
    this.SHOOT_COOLDOWN = 30
  }

  private shootLevel8(position: Vector3) {
    new BombMissile(position, 0.2)
    new BombMissile(position, -0.2)
    new BombMissile(position, 0.5)
    new BombMissile(position, -0.5)
    new BombMissile(position, 0.7)
    new BombMissile(position, -0.7)
    this.SHOOT_COOLDOWN = 40
  }
}
