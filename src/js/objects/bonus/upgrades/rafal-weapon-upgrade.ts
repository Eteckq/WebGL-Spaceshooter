import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import WeaponUpgrade from '../../abstract/weapon-upgrade'

export default class RafalWeaponUpgrade extends WeaponUpgrade {
  constructor(position: Vector3) {
    super('yellow', position)
  }

  actionOnRelease(): void {
    throw new Error('Method not implemented.')
  }
}
