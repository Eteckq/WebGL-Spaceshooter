import {
  Vector2,
  Vector3,
} from '../../../../../node_modules/@math.gl/core/src/index'
import { getDirection } from '../../../utils/utils'
import EnemyMissile from '../../abstract/enemy-missile'

export default class UfoEnemyMissile extends EnemyMissile {
  speedCoef: number
  coef: Vector2
  constructor(position: Vector3, ufoPosition: Vector3) {
    super(position, 'ufo', 0.035, 0.035)
    this.speed = 2

    let direction = getDirection(ufoPosition, this.position)
    this.speedCoef = direction.speed
    this.coef = direction.coef
  }

  public update() {
    this.position[0] -= this.coef.x * this.speedCoef * this.speed
    this.position[1] -= this.coef.y * this.speedCoef * this.speed
  }
}
