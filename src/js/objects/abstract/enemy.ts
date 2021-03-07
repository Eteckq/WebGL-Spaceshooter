import { getRandomBoolValue } from '../../utils/utils'
import Damageable from '../interface/damageable'
import Damager from '../interface/damager'
import Player from '../player'
import BasicMissile from '../projectiles/player/basic-missile'
import GameManager from '../../game-manager'
import BoundedEntity from './bounded-entity'

export default abstract class Enemy
  extends BoundedEntity
  implements Damageable, Damager {
  public attack: number = 20
  public health: number = 10

  public score: number = 1

  constructor(texture = 'Black1', width: number, height: number) {
    super(`/assets/images/PNG/Enemies/enemy${texture}.png`, width, height)
    this.directionX = getRandomBoolValue()
  }

  protected onCollision(other: Object) {
    if (other instanceof Player) {
      other.damage(this.attack)
      this.damage(5)
    } else if (other instanceof BasicMissile) {
      this.damage(other.attack)
      other.clear()
    }
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed
    this.update()
  }

  abstract update(): void

  damage(amount: number): void {
    this.health -= amount

    if (this.health <= 0) {
      GameManager.Instance.killEnemy(this)
      this.clear()
    }
  }
}
