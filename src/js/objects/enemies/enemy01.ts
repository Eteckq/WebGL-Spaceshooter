import { getRandomBoolValue, getRandomInt } from '../../utils/utils'
import Enemy from '../abstract/enemy'
import BasicEnemyMissile from '../projectiles/enemy/basic-enemy-missile'

export default class Enemy01 extends Enemy {
  constructor() {
    super('Black1', 0.08, 0.08)
    this.speed = 0.5
    this.health = 10
  }

  public update() {
    if (Math.round(Math.random() * 150) === 0) {
      this.shoot()
    }

    if (Math.round(Math.random() * 1000) === 0) {
      this.directionX = getRandomBoolValue()
    }
    if (Math.round(Math.random() * 500) === 0) {
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
