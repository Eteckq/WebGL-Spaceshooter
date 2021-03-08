import GameManager from '../../../game-manager'
import Bonus from '../../abstract/bonus'

export default class HealthBonus extends Bonus {
  constructor(position: { x: number; y: number; z: number }) {
    super('health', position)
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.healthBonus()
  }
}
