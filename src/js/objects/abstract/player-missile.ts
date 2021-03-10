import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import Missile from './missile'

export default abstract class PlayerMissile extends Missile {
  constructor(
    position: Vector3,
    texture: string,
    width: number,
    height: number
  ) {
    super(
      position,
      `/assets/images/Missiles/Player/${texture}.png`,
      width,
      height
    )
  }
}
