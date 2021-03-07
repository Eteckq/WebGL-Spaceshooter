import { getRandomFloat } from '../../utils/utils'
import Weapon from '../abstract/weapon'
import BasicMissile from '../projectiles/player/basic-missile'
import WaveMissile from '../projectiles/player/wave-missile'

export default class WaveWeapon extends Weapon {
  constructor() {
    super()
    this.SHOOT_COOLDOWN = 28
  }

  public use(position: { x: number; y: number; z?: number }, level: number) {
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

  private shootLevel1(position: { x: number; y: number; z?: number }) {
    this.spawnMissile(position, 1, 3)
  }

  private shootLevel2(position: { x: number; y: number; z?: number }) {
    this.spawnMissile(position, 2, 7)
  }

  private shootLevel3(position: { x: number; y: number; z?: number }) {
    this.shootCooldown -= 13
    this.spawnMissile(position, 2, 8)
  }

  private shootLevel4(position: { x: number; y: number; z?: number }) {
    this.shootCooldown -= 15
    this.spawnMissile(position, 3, 11)
  }

  private shootLevel5(position: { x: number; y: number; z?: number }) {
    this.shootCooldown -= 18
    this.spawnMissile(position, 3, 13)
  }

  private shootLevel6(position: { x: number; y: number; z?: number }) {
    this.shootCooldown -= 18
    this.spawnMissile(position, 4, 13)
  }

  private shootLevel7(position: { x: number; y: number; z?: number }) {
    this.shootCooldown -= 18
    this.spawnMissile(position, 5, 14)
  }

  private shootLevel8(position: { x: number; y: number; z?: number }) {
    this.shootCooldown -= 22
    this.spawnMissile(position, 5, 15)
  }

  private spawnMissile(
    position: { x: number; y: number; z?: number },
    count: number,
    angleMax: number
  ) {
    for (let i = 0; i < count; i++) {
      let m = new WaveMissile(getRandomFloat(-angleMax, angleMax))
      m.setPosition(position)
    }
  }
}
