import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import { generateOdds, getRandomBoolValue } from '../../utils/utils'
import Enemy from '../abstract/enemy'
import GreenEnemyMissile from '../projectiles/enemy/green-enemy-missile'

export default class Enemy05 extends Enemy {
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
    if (generateOdds(150)) {
      this.shoot()
    }

    let newX = this.speed * 0.003 * this.directionX
    let newY = this.speed * 0.003 * this.directionY

    this.move(newX, newY)
  }

  private shoot() {
    new GreenEnemyMissile(this.getPosition())
  }
}
