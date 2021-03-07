import Weapon from '../abstract/weapon'
import BasicMissile from '../projectiles/player/basic-missile'
import WaveMissile from '../projectiles/player/wave-missile'

export default class WaveWeapon extends Weapon {
  constructor() {
    super()
    this.SHOOT_COOLDOWN = 15
  }

  public use(position: { x: number; y: number; z?: number }, level: number) {
    switch (level) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      default:
        this.shootLevel1(position)
        break
    }
  }

  private shootLevel1(position: { x: number; y: number; z?: number }) {
    let wm = new WaveMissile(40)
    wm.setPosition(position)
  }
}
