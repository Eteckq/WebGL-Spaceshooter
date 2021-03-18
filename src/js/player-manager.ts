import GameManager from './game-manager'
import SlotBonus from './objects/bonus/consumables/slot'
import Player from './objects/player'
import { currentlyPressedKeys, registerOnShiftCallback } from './utils/inputs'
import View from './view'
import WeaponManager from './weapon-manager'

export default class PlayerManager {
  public player: Player

  public damageCooldown: number = 0
  public DAMAGE_COOLDOWN: number = 20

  private speed: number = 1
  public health: number = 20

  public weaponManager = new WeaponManager()

  constructor() {
    this.player = new Player()
    View.setHp(this.health)
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

  public healthBonus() {
    if (this.health < 50) {
      this.health += 10
    }
    if (this.health > 50) {
      this.health = 50
    }
    View.setHp(this.health)
  }

  public invulBonus() {
    this.damageCooldown = 200
    View.setInvul(true)
  }

  public slotBonus() {
    if (this.weaponManager.addSlot()) {
      let i = GameManager.Instance.waveManager.spawnableBonus.indexOf(SlotBonus)
      GameManager.Instance.waveManager.spawnableBonus.splice(i, 1)
    }
  }

  public tick() {
    this.damageCooldown--
    if (this.damageCooldown <= 0) {
      View.setInvul(false)
    }
    this.weaponManager.tick()

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

    registerOnShiftCallback(() => {
      this.onShift()
    })

    if (currentlyPressedKeys[32]) {
      //Space
      this.weaponManager.shoot(this.player.getPosition())
    }
  }

  private onShift() {
    this.weaponManager.removeFirstUpgrade()
  }

  public move(x: number, y: number) {
    x = x * 0.1 * this.speed
    y = y * 0.1 * this.speed
    let pos = this.player.getPosition()
    this.player.setRotation(pos.x * 0.5)
    let xMax = 1.1
    let yMax = 1
    if (pos.x + x > -xMax && pos.x + x < xMax) {
      this.player.position[0] += x
    }

    if (pos.y + y > -yMax && pos.y + y < yMax) {
      this.player.position[1] += y
    }
  }
}
