import PlayerMissile from '../../abstract/player-missile'

export default class WaveMissile extends PlayerMissile {
  constructor(protected angle: number = 0) {
    super(`/assets/images/PNG/Lasers/laserGreen06.png`, 0.02, 0.06)
  }

  public update() {
    this.position[1] += this.speed * 0.05 * 2 // permet de déplacer le splat vers le haut au fil du temps
    this.position[0] += this.speed * 0.0007 * this.angle // permet de déplacer le splat sur l'axe X
  }
}
