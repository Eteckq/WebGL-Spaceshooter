import { initTexture } from '../../utils/utils'
import Damager from '../interface/damager'
import Rectangle from './rectangle'

export default abstract class Missile extends Rectangle implements Damager {
  protected speed: number = 0.5
  public attack: number = 10

  constructor(texture: string, width: number, height: number) {
    super(width, height)
    this.texture = initTexture(texture, this.width, this.height)
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed
    this.update()
  }
  abstract update(): void
}
