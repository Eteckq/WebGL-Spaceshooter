import Enemy from './enemy'
import Damager from '../interface/damager'
import Player from '../player'
import Rectangle from './rectangle'

export default abstract class Missile extends Rectangle implements Damager {
  protected speed: number = 0.5
  public attack: number = 10

  constructor(width: number, height: number) {
    super(width, height)
  }

  abstract tick(elapsed: number): void
}
