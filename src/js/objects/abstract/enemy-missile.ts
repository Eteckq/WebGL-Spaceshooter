import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../game-manager'
import Damager from '../interface/damager'
import Missile from './missile'
import Projectile from './objects/projectile'

export default abstract class EnemyMissile
  extends Projectile
  implements Damager {
  public attack: number = 10

  constructor(position: Vector3) {
    super(
      position,
      0.02 * GameManager.Instance.difficulty,
      0.02 * GameManager.Instance.difficulty
    )
  }

  public tick(elapsed: number) {
    if (this.time > 80) {
      this.clear()
      return
    }
    this.time += 0.01 * elapsed
    this.update()
  }
  abstract update(): void
}
