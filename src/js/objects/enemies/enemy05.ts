import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import { getRandomBoolValue } from '../../utils/utils'
import Enemy from '../abstract/enemy'

export default class Enemy05 extends Enemy {
  constructor(position: Vector3 = new Vector3(Vector3.ZERO)) {
    super(position, 'enemyGreen5', 0.08, 0.08)

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
    let newX = this.speed * 0.003 * this.directionX
    let newY = this.speed * 0.003 * this.directionY

    this.move(newX, newY)
  }
}
