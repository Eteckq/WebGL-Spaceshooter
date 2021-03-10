import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import WeaponUpgrade from '../../abstract/weapon-upgrade'

export default class WaveWeaponUpgrade extends WeaponUpgrade {
  constructor(position: Vector3) {
    super('green', position)
  }
}
