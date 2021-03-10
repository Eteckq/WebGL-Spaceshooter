import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import WeaponUpgrade from '../../abstract/weapon-upgrade'

export default class BombWeaponUpgrade extends WeaponUpgrade {
  constructor(position: Vector3) {
    super('red', position)
  }
}
