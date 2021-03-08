import { getRandomBoolValue } from '../../utils/utils'
import Damageable from '../interface/damageable'
import Damager from '../interface/damager'
import Player from '../player'
import BasicMissile from '../projectiles/player/basic-missile'
import GameManager from '../../game-manager'
import BoundedEntity from './bounded-entity'
import PlayerMissile from './player-missile'

export default abstract class Enemy
  extends BoundedEntity
  implements Damageable, Damager {
  public attack: number = 20
  public health: number = 10

  public score: number = 1

  constructor(texture: string, width: number, height: number) {
    super(`/assets/images/Enemies/${texture}.png`, width, height)
    this.directionX = getRandomBoolValue()

    this.maxTop = 1
    this.maxBottom = 0.3
    this.maxLeft = 1.1
    this.maxRight = 1.1
  }

  protected onCollision(other: Object) {
    if (other instanceof PlayerMissile) {
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
