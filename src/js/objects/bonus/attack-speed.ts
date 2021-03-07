import GameManager from '../../game-manager'
import Bonus from '../abstract/bonus'

export default class AttackSpeedBonus extends Bonus {
  constructor() {
    super('powerupBlue_bolt')
  }

  actionOnCatch(): void {
    GameManager.Instance.upgradeSpeedBonus()
  }
}
