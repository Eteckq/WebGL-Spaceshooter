import GameManager from '../../game-manager'
import WeaponUpgrade from '../abstract/weapon-upgrade'

export default class BasicWeaponUpgrade extends WeaponUpgrade {
  constructor() {
    super('powerupBlue_star')
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.weaponManager.basicWeaponUpgrade()
  }
}
