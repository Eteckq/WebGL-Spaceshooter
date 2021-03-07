import Missile from '../../abstract/missile'

export default class BasicMissile extends Missile {
  constructor(protected angle: number = 0) {
    super(`/assets/images/PNG/Lasers/laserBlue06.png`, 0.02, 0.06)
  }

  public update() {
    if (this.position[1] > 1) {
      this.clear()
    }
    this.position[1] += this.speed * 0.05 // permet de déplacer le splat vers le haut au fil du temps
    this.position[0] += this.speed * 0.0007 * this.angle // permet de déplacer le splat sur l'axe X
  }
}