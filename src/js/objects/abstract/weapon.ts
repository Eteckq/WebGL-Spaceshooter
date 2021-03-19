import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'

export default abstract class Weapon {
  public SHOOT_COOLDOWN: number = 30
  protected shootCooldown: number = 0

  shoot(pos: Vector3, level: number) {
    if (this.shootCooldown <= 0 && level > 0) {
      this.shootCooldown = this.SHOOT_COOLDOWN
      this.use(pos, level)
    }
  }

  abstract use(pos: Vector3, level: number): void

  public tick() {
    this.shootCooldown--
  }
}
