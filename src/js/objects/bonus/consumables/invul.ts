import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../../game-manager'
import Bonus from '../../abstract/bonus'

export default class InvulBonus extends Bonus {
  constructor(position: Vector3) {
    super(position, 'invul')
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.invulBonus()
  }
}
