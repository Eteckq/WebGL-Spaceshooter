import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import EnemyMissile from '../../abstract/enemy-missile'

export default class GreenEnemyMissile extends EnemyMissile {
  constructor(position: Vector3, protected angle: number = 0) {
    super(position)
    this.speed = 0.2
    this.attack = 30
  }

  public update() {
    this.position[1] -= this.speed * 0.05
    this.position[0] += this.speed * 0.0007 * this.angle
  }
}
