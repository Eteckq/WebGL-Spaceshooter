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
    super('Black1', 0.08, 0.08)
    this.speed = getRandomFloat(0.4, 0.7)
    this.health = 10
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
    let newSplat = new BasicEnemyMissile()
    newSplat.setPosition(this.getPosition())
  }
}
