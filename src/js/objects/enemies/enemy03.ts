import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import { getRandomFloat } from '../../utils/utils'
import Enemy from '../abstract/enemy'

export default class Enemy03 extends Enemy {
  constructor(position: Vector3 = new Vector3(Vector3.ZERO)) {
    super(position, 'enemyRed4', 0.15, 0.25)
    this.speed = getRandomFloat(0.4, 0.9)
    this.health = 100
    this.score = 10
    this.attack = 40

    this.directionX = 0
    this.directionY = 1
    this.maxTop = 1
    this.maxBottom = 3
    this.maxLeft = 0.8
    this.maxRight = 0.8
  }

  public update() {
    let newY = this.speed * 0.01 * this.directionY

    this.move(0, newY)

    if (this.getPosition().y <= -1.5) {
      this.clear()
    }
  }
}
