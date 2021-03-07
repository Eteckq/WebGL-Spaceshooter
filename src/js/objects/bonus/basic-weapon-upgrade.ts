import GameManager from '../../game-manager'
import WeaponUpgrade from '../abstract/weapon-upgrade'

export default class BasicWeaponUpgrade extends WeaponUpgrade {
  constructor() {
    super('powerupBlue_bolt')
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.basicWeaponUpgrade()
  }
}
