import { getRandomBoolValue } from '../../utils/utils'
import Enemy from '../abstract/enemy'

export default class Enemy05 extends Enemy {
  constructor() {
    super('enemyGreen5', 0.08, 0.08)

    this.speed = 1
    this.health = 50
    this.score = 20
    this.attack = 20

    this.directionX = getRandomBoolValue()
    this.directionY = 1
    this.maxTop = 1
    this.maxBottom = 0
    this.maxLeft = 0.9
    this.maxRight = 0.9
  }

  public update() {
    let newX = this.speed * 0.003 * this.directionX
    let newY = this.speed * 0.003 * this.directionY

    this.move(newX, newY)
  }
}
