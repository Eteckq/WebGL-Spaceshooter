import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import {
  generateOdds,
  getRandomBoolValue,
  getRandomFloat,
  getRandomInt,
} from '../../utils/utils'
import Enemy from '../abstract/enemy'
import BasicEnemyMissile from '../projectiles/enemy/basic-enemy-missile'
import FastEnemyMissile from '../projectiles/enemy/fast-enemy-missile'

export default class Enemy02 extends Enemy {
  constructor() {
    super('enemyBlue2', 0.06, 0.06)
    this.speed = getRandomFloat(0.7, 1)
    this.health = 10
    this.score = 2

    this.directionX = getRandomBoolValue()

    this.maxTop = 1
    this.maxBottom = 0
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

    if (Math.round(this.time) % 15 < 10) {
      this.move(newX, newY)
    }
  }

  public shoot() {
    new FastEnemyMissile(this.getPosition())
  }
}
