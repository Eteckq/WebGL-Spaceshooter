import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import PlayerMissile from '../../abstract/player-missile'

export default class BasicMissile extends PlayerMissile {
  constructor(position: Vector3, protected angle: number = 0) {
    super(position, `laserBlue06`, 0.02, 0.06)
  }

  public update() {
    this.position[1] += this.speed * 0.05
    this.position[0] += this.speed * 0.0007 * this.angle
  }
}
