import { initTexture } from '../../../utils/utils'
import Missile from '../../abstract/missile'

export default class BasicEnemyMissile extends Missile {
  constructor(protected angle: number = 0) {
    super(0.02, 0.06)
    this.texture = initTexture(
      `/assets/images/PNG/Lasers/laserRed06.png`,
      this.width,
      this.height
    )
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    this.position[1] += this.speed * -0.05
    this.position[0] += this.speed * 0.0007
  }
}
