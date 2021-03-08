import GameManager from '../../game-manager'
import Bonus from '../abstract/bonus'

export default class SlotBonus extends Bonus {
  constructor(position: { x: number; y: number; z: number }) {
    super('slot', position)
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.slotBonus()
  }
}
