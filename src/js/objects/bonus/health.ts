import GameManager from '../../game-manager'
import Bonus from '../abstract/bonus'

export default class HealthBonus extends Bonus {
  constructor() {
    super('powerupRed_bolt')
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.healthBonus()
  }
}
