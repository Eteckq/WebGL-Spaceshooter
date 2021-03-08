import GameManager from '../../game-manager'
import WeaponUpgrade from '../abstract/weapon-upgrade'

export default class WaveWeaponUpgrade extends WeaponUpgrade {
  constructor(position: { x: number; y: number; z: number }) {
    super('powerupGreen_star', position)
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.weaponManager.pushUpgrade(this)
  }
}
