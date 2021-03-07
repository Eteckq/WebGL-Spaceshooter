import GameManager from '../../game-manager'
import Bonus from '../abstract/bonus'

export default class SlotBonus extends Bonus {
  constructor() {
    super('star_silver')
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.slotBonus()
  }
}
