import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import Damager from '../interface/damager'
import Rectangle from './objects/rectangle'

export default abstract class Missile extends Rectangle implements Damager {
  protected speed: number = 0.4
  public attack: number = 10

  constructor(
    position: Vector3,
    texture: string,
    width: number,
    height: number
  ) {
    super(position, texture, width, height)
  }

  public tick(elapsed: number) {
    if (this.time > 80) {
      this.clear()
      return
    }
    this.time += 0.01 * elapsed
    this.update()
  }
  abstract update(): void
}
