import Enemy from './enemy'
import Damager from '../interface/damager'
import Player from '../player'
import { getRandom, initTexture } from '../../utils/utils'
import Bonus from './bonus'

export default abstract class WeaponUpgrade extends Bonus {

  constructor(texture: string) {
    super(texture)
  }


  protected onCollision(other: Object) {
    if (other instanceof Player) {
      this.actionOnCatch()
      this.clear()
    }
  }

  abstract actionOnCatch(): void
}
