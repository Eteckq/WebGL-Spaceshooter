import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import {
  generateOdds,
  getRandomBoolValue,
  getRandomFloat,
  getRandomInt,
} from '../../utils/utils'
import Enemy from '../abstract/enemy'
import BasicEnemyMissile from '../projectiles/enemy/basic-enemy-missile'

export default class Enemy01 extends Enemy {
  constructor(position: Vector3 = new Vector3(Vector3.ZERO)) {
    super(position, 'enemyBlack1', 0.08, 0.08)
    this.speed = getRandomFloat(0.4, 0.7)
    this.health = 20
    this.score = 2

    this.directionX = getRandomBoolValue()

    this.maxTop = 1
    this.maxBottom = 0.3
    this.maxLeft = 1.1
    this.maxRight = 1.1
  }

  public update() {
    if (generateOdds(150)) {
      this.shoot()
    }

    if (generateOdds(1000)) {
      this.directionX = getRandomBoolValue()
    }
    if (generateOdds(500)) {
      this.directionY = getRandomInt(-1, 1)
    }

    let newX = this.speed * 0.03 * this.directionX
    let newY = this.speed * 0.01 * this.directionY

    this.move(newX, newY)
  }

  public shoot() {
    let newSplat = new BasicEnemyMissile(this.getPosition())
  }
}
