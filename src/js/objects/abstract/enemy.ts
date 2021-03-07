import { getRandom, initTexture } from '../../utils/utils'
import Damageable from '../interface/damageable'
import Damager from '../interface/damager'
import Player from '../player'
import Missile from './missile'
import BasicEnemyMissile from '../projectiles/enemy/basicEnemyMissile'
import Rectangle from './rectangle'
import BasicMissile from '../projectiles/player/basicMissile'
import GameManager from '../../game-manager'

export default abstract class Enemy
  extends Rectangle
  implements Damageable, Damager {
  protected speed: number = 0.5

  protected directionX: number
  protected directionY: number

  public attack: number = 20
  public health: number = 10

  public score: number = 1

  constructor(texture = 'Black1', width: number, height: number) {
    super(width, height)
    this.texture = initTexture(
      `/assets/images/PNG/Enemies/enemy${texture}.png`,
      this.width,
      this.height
    )
    this.position[0] = getRandom(-1, 1)
    this.position[1] = getRandom(1.1, 1.4)
    this.directionX = getRandom(-1, 1)
    this.directionY = getRandom(0.2, 1)
  }

  protected onCollision(other: Object) {
    if (other instanceof Player) {
      other.damage(this.attack)
      this.damage(10)
    } else if (other instanceof BasicMissile) {
      this.damage(other.attack)
      other.clear()
    }
  }

  damage(amount: number): void {
    this.health -= amount

    if (this.health <= 0) {
      GameManager.Instance.killEnemy(this)
      this.clear()
    }
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    let speed = 0.8

    if (Math.round(Math.random() * 150) === 0) {
      this.shoot()
    }

    if (Math.round(Math.random() * 1000) === 0) {
      this.directionX = -this.directionX
    }
    if (Math.round(Math.random() * 500) === 0) {
      this.directionY = -this.directionY
    }

    let newX = speed * 0.03 * this.directionX
    if (this.position[0] - newX < -1.2 || this.position[0] - newX > 1.2) {
      this.directionX = -this.directionX
      newX = -newX
    }

    let newY = speed * 0.01 * this.directionY
    if (this.position[1] - newY < -0.5 || this.position[1] - newY > 1.5) {
      this.directionY = -this.directionY
      newY = -newY
    }

    this.position[1] -= newY
    this.position[0] -= newX
  }
  public shoot() {
    let newSplat = new BasicEnemyMissile(Math.random() * 20 - 10)
    newSplat.setPosition(this.getPosition())
  }
}
