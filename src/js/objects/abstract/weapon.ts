export default abstract class Weapon {
  protected SHOOT_COOLDOWN: number = 30
  protected shootCooldown: number = 0

  shoot(pos: { x: number; y: number; z: number }, level: number) {
    if (this.shootCooldown <= 0 && level > 0) {
      this.shootCooldown = this.SHOOT_COOLDOWN
      this.use(pos, level)
    }
  }

  abstract use(pos: { x: number; y: number; z: number }, level: number): void

  public tick() {
    this.shootCooldown--
  }
}
