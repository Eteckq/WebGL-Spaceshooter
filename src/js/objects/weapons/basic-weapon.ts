import Weapon from '../abstract/weapon'
import BasicMissile from '../projectiles/player/basic-missile'

export default class BasicWeapon extends Weapon {
  constructor() {
    super()
    this.maxLevel = 6
    this.level = 1
    this.SHOOT_COOLDOWN = 25
  }

  public shoot(position: { x: number; y: number; z?: number }) {
    if (this.shootCooldown <= 0) {
      this.shootCooldown = this.SHOOT_COOLDOWN
      if (this.level >= 5) {
        this.shootCooldown -= 8
      }
      if (this.level >= 6) {
        this.shootCooldown -= 6
      }
      switch (this.level) {
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
        case 5:
        case 6:
          this.shootLevel4(position)
          break
      }
    }
  }

  private shootLevel1(position: { x: number; y: number; z?: number }) {
    let bm = new BasicMissile()
    bm.setPosition(position)
  }
  private shootLevel2(position: { x: number; y: number; z?: number }) {
    let bm0 = new BasicMissile()
    bm0.setPosition({ x: position.x - 0.02, y: position.y })
    let bm1 = new BasicMissile()
    bm1.setPosition({ x: position.x + 0.02, y: position.y })
  }
  private shootLevel3(position: { x: number; y: number; z?: number }) {
    this.shootLevel2(position)

    let bm0 = new BasicMissile(10)
    bm0.setPosition({ x: position.x, y: position.y - 0.05 })
    let bm1 = new BasicMissile(-10)
    bm1.setPosition({ x: position.x, y: position.y - 0.05 })
  }
  private shootLevel4(position: { x: number; y: number; z?: number }) {
    let bm6 = new BasicMissile(15)
    bm6.setPosition({ x: position.x, y: position.y - 0.07 })
    let bm5 = new BasicMissile(-15)
    bm5.setPosition({ x: position.x, y: position.y - 0.07 })
    let bm3 = new BasicMissile(10)
    bm3.setPosition({ x: position.x, y: position.y - 0.05 })
    let bm4 = new BasicMissile(-10)
    bm4.setPosition({ x: position.x, y: position.y - 0.05 })
    let bm0 = new BasicMissile()
    bm0.setPosition({ x: position.x, y: position.y })
    let bm1 = new BasicMissile()
    bm1.setPosition({ x: position.x + 0.04, y: position.y })
    let bm2 = new BasicMissile()
    bm2.setPosition({ x: position.x - 0.04, y: position.y })
  }
}
