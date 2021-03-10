import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import {
  generateOdds,
  getRandomBoolValue,
  getRandomFloat,
} from '../../utils/utils'
import Enemy from '../abstract/enemy'
import UfoEnemyMissile from '../projectiles/enemy/ufo-enemy-missile'

export default class Enemy04 extends Enemy {
  private isShooting = false
  constructor(position: Vector3 = new Vector3(Vector3.ZERO)) {
    super(position, 'ufoYellow', 0.15, 0.15)
    // this.speed = getRandomFloat(0.4, 0.9)

    this.speed = 2
    this.health = 150
    this.score = 15
    this.attack = 20

    this.directionX = getRandomBoolValue()
    this.directionY = 1
    this.maxTop = 1
    this.maxBottom = 0
    this.maxLeft = 0.9
    this.maxRight = 0.9
  }

  public update() {
    if (this.isShooting) {
      return
    }
    if (generateOdds(100)) {
      this.shoot()
    }

    let newX = this.speed * 0.003 * this.directionX
    let newY = this.speed * 0.003 * this.directionY

    this.move(newX, newY)
  }
  shoot() {
    let nbrOfShots = 12
    let delayBetweenShots = 150

    this.isShooting = true
    for (let i = 1; i <= nbrOfShots; i++) {
      setTimeout(() => {
        let position = this.getPosition()

        let x0 = position.x
        let y0 = position.y
        let r = 0.2
        let t = (360 / nbrOfShots) * i

        let x = x0 + r * Math.cos(t)
        let y = y0 + r * Math.sin(t)

        new UfoEnemyMissile(new Vector3(x, y, 0.5), this.position)
      }, i * delayBetweenShots)
    }

    setTimeout(() => {
      this.isShooting = false
    }, delayBetweenShots * nbrOfShots + delayBetweenShots)
  }
}
