import GameManager from '../../game-manager'
import { generateOdds, getRandomBoolValue } from '../../utils/utils'
import Enemy from '../abstract/enemy'
import GreenEnemyMissile from '../projectiles/enemy/green-enemy-missile'

export default class StrongEnemy extends Enemy {
  constructor() {
    super('enemyGreen5', 0.08, 0.08)

    this.speed = 1
    this.health = 75
    this.score = 11
    this.attack = 20

    this.directionX = getRandomBoolValue()
    this.directionY = 1
    this.maxTop = 1
    this.maxBottom = 0
    this.maxLeft = 0.9
    this.maxRight = 0.9
  }

  public update() {
    if (generateOdds((150 * 1) / GameManager.Instance.difficulty)) {
      this.shoot()
    }

    let newX = this.speed * 0.003 * this.directionX
    let newY = this.speed * 0.003 * this.directionY

    this.move(newX, newY)
  }

  private shoot() {
    new GreenEnemyMissile(this.getPosition(), -9)
    new GreenEnemyMissile(this.getPosition(), -5)
    new GreenEnemyMissile(this.getPosition(), 0)
    new GreenEnemyMissile(this.getPosition(), 5)
    new GreenEnemyMissile(this.getPosition(), 9)
  }
}
