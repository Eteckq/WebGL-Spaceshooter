import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../../game-manager'
import Bonus from '../../abstract/bonus'

export default class SlotBonus extends Bonus {
  constructor(position: Vector3) {
    super(position, 'slot')
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.slotBonus()
  }
}
