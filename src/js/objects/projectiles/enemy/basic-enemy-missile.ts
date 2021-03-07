import Missile from '../../abstract/missile'

export default class BasicEnemyMissile extends Missile {
  constructor() {
    super(`/assets/images/PNG/Lasers/laserRed06.png`, 0.02, 0.06)
  }

  public update() {
    this.position[1] += this.speed * -0.05
    this.position[0] += this.speed * 0.0007
  }
}
