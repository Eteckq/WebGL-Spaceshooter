import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import WeaponUpgrade from '../../abstract/weapon-upgrade'

export default class BasicWeaponUpgrade extends WeaponUpgrade {
  constructor(position: Vector3) {
    super('blue', position)
  }
}
