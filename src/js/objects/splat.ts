import { initTexture } from '../utils/utils'
import Rectangle from './abstract/rectangle'

export default class Splat extends Rectangle {
  protected speed: number = 0.5

  constructor(
    protected angle: number = 0,
    protected direction: number = 1,
    color: string = 'Blue06'
  ) {
    super(0.02, 0.06)
    this.texture = initTexture(
      `/assets/images/PNG/Lasers/laser${color}.png`,
      this.width,
      this.height
    )
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    this.position[1] += this.speed * 0.05 * this.direction // permet de déplacer le splat vers le haut au fil du temps
    this.position[0] += this.speed * 0.0007 * this.angle // permet de déplacer le splat sur l'axe X
  }

  setPosition(position: { x: number; y: any; z: any }) {
    this.position[0] = position.x
    this.position[1] = position.y
    this.position[2] = position.z
  }
}
