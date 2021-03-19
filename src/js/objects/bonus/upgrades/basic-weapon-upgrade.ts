import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../../game-manager'
import WeaponUpgrade from '../../abstract/weapon-upgrade'

export default class BasicWeaponUpgrade extends WeaponUpgrade {
  constructor(position: Vector3) {
    super('blue', position)
  }

  actionOnRelease(): void {
    GameManager.Instance.playerManager.weaponManager.weapons.basic.SHOOT_COOLDOWN -= 10
    setTimeout(() => {
      GameManager.Instance.playerManager.weaponManager.weapons.basic.SHOOT_COOLDOWN += 10
    }, 1000)
  }
}
