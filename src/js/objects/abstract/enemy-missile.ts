import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../game-manager'
import Missile from './missile'

export default abstract class EnemyMissile extends Missile {
  constructor(position: Vector3) {
    super(
      position,
      `/assets/images/Missiles/Enemy/enemy.png`,
      0.025 * GameManager.Instance.difficulty,
      0.025 * GameManager.Instance.difficulty
    )
  }
}
