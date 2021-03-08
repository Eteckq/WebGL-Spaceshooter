import { initTexture } from '../../utils/utils'
import Damager from '../interface/damager'
import Rectangle from './rectangle'

export default abstract class Missile extends Rectangle implements Damager {
  protected speed: number = 0.5
  public attack: number = 10

  constructor(texture: string, width: number, height: number) {
    super(texture, width, height)
  }

  public tick(elapsed: number) {
    if (this.position[1] > 1) {
      this.clear()
      return
    }
    this.time += 0.01 * elapsed
    this.update()
  }
  abstract update(): void
}
