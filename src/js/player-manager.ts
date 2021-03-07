import GameManager from './game-manager'
import Player from './objects/player'
import BasicMissile from './objects/projectiles/player/basicMissile'
import currentlyPressedKeys from './utils/inputs'
import View from './view'

export default class PlayerManager {
  public player: Player

  private shootCooldown: number = 0

  public damageCooldown: number = 0
  public DAMAGE_COOLDOWN: number = 20

  private speed: number = 1
  public health: number = 20

  private speedBonusLevel: number = 0

  constructor() {
    this.player = new Player()
    View.setHp(this.health)
  }

  public getCooldown() {
    return 30 - this.speedBonusLevel * 5
  }

  public damage(amount: number) {
    if (this.damageCooldown <= 0) {
      this.damageCooldown = this.DAMAGE_COOLDOWN
      this.health -= amount

      View.setHp(this.health)
      if (this.health <= 0) {
        GameManager.Instance.gameOver()
      }
    }
  }

  public upgradeSpeedBonus(): number {
    if (this.speedBonusLevel < 4) {
      this.speedBonusLevel++
    }
    return this.speedBonusLevel
  }

  public healthBonus() {
    if (this.health < 50) {
      this.health += 10
    }
    if (this.health > 50) {
      this.health = 50
    }
    View.setHp(this.health)
  }

  public shoot() {
    if (this.shootCooldown <= 0) {
      this.shootCooldown = this.getCooldown()
      let newSplat = new BasicMissile()

      newSplat.setPosition(this.player.getPosition())
    }
  }

  public tick() {
    this.damageCooldown--
    this.shootCooldown--
    this.handleInputs()
  }

  private handleInputs() {
    if (currentlyPressedKeys[68]) {
      // D
      this.move(1, 0)
    }

    if (currentlyPressedKeys[81]) {
      // Q
      this.move(-1, 0)
    }

    if (currentlyPressedKeys[90]) {
      // Z
      this.move(0, 1)
    }

    if (currentlyPressedKeys[83]) {
      // S
      this.move(0, -1)
    }

    if (currentlyPressedKeys[32]) {
      this.shoot()
    }
  }

  public move(x: number, y: number) {
    x = x * 0.1 * this.speed
    y = y * 0.1 * this.speed
    let pos = this.player.getPosition()
    this.player.setRotation(pos.x * 0.5)
    let xMax = 1.1
    let yMax = 1
    let scale = 5
    if (pos.x > xMax) {
      this.player.position[0] = -xMax * scale
    }

    if (pos.x < -xMax) {
      this.player.position[0] = xMax * scale
    }

    if (pos.y + y > -yMax && pos.y + y < yMax) {
      this.player.position[1] += y
    }

    this.player.position[0] += x
  }
}
