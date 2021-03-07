import GameManager from '../../game-manager'
import WeaponUpgrade from '../abstract/weapon-upgrade'

export default class WaveWeaponUpgrade extends WeaponUpgrade {
  constructor() {
    super('powerupGreen_star')
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.weaponManager.pushUpgrade(
      WaveWeaponUpgrade
    )
  }
}
