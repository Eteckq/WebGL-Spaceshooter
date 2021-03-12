import {
  Vector2,
  Vector3,
} from '../../../../../node_modules/@math.gl/core/src/index'
import { getDirection } from '../../../utils/utils'
import EnemyMissile from '../../abstract/enemy-missile'

export default class GreenEnemyMissile extends EnemyMissile {
  constructor(position: Vector3, protected angle: number = 0) {
    super(position, 'laserGreen16', 0.035, 0.035)
    this.speed = 0.2
    this.attack = 30
  }

  public update() {
    this.position[1] -= this.speed * 0.05
    this.position[0] += this.speed * 0.0007 * this.angle
  }
}
