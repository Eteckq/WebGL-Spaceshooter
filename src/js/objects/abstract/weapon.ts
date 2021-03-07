export default abstract class Weapon {
  protected SHOOT_COOLDOWN: number = 30
  protected shootCooldown: number = 0
  public level: number = 0

  protected maxLevel: number = 10

  shoot(pos: { x: number; y: number; z: number }) {
    if (this.shootCooldown <= 0 && this.level > 0) {
      this.shootCooldown = this.SHOOT_COOLDOWN
      this.use(pos)
    }
  }

  abstract use(pos: { x: number; y: number; z: number }): void

  public tick() {
    this.shootCooldown--
  }

  public levelUp(): void {
    if (this.level < this.maxLevel) {
      this.level++
    }
  }
}
