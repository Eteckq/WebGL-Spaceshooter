import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../../game-manager'
import Bonus from '../../abstract/bonus'

export default class HealthBonus extends Bonus {
  constructor(position: Vector3) {
    super(position, 'health')
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.healthBonus()
  }
}
