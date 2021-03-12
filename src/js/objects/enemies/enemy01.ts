import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../game-manager'
import {
  generateOdds,
  getRandomBoolValue,
  getRandomFloat,
  getRandomInt,
} from '../../utils/utils'
import Enemy from '../abstract/enemy'
import BasicEnemyMissile from '../projectiles/enemy/basic-enemy-missile'

export default class Enemy01 extends Enemy {
  constructor() {
    super('enemyBlack1', 0.08, 0.08)
    this.speed = getRandomFloat(0.2, 0.7)
    this.health = 20
    this.score = 2

    this.directionX = getRandomBoolValue()

    this.maxTop = 1
    this.maxBottom = 0.3
    this.maxLeft = 1.1
    this.maxRight = 1.1
  }

  public update() {
    if (generateOdds((150 * 1) / GameManager.Instance.difficulty)) {
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
    new BasicEnemyMissile(this.getPosition())
  }
}
