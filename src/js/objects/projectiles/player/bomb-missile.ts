import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import PlayerMissile from '../../abstract/player-missile'

export default class BombMissile extends PlayerMissile {
  constructor(position: Vector3) {
    super(position, `laserRed08`, 0.03, 0.03)
    this.attack = 30
  }

  public update() {
    this.position[0] += this.speed * 0.01 * Math.sin(this.time) * 0.001
    this.position[1] += this.speed * 0.004
  }
}
