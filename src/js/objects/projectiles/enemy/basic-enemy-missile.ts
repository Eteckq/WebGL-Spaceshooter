import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import EnemyMissile from '../../abstract/enemy-missile'

export default class BasicEnemyMissile extends EnemyMissile {
  constructor(position: Vector3) {
    super(position)
  }

  public update() {
    this.position[1] += this.speed * -0.05
    // this.position[0] += this.speed * 0.0007
  }
}
