import GameManager from '../../../game-manager'
import EnemyMissile from '../../abstract/enemy-missile'

export default class UfoEnemyMissile extends EnemyMissile {
  constructor() {
    super('ufo', 0.035, 0.035)
  }

  public update() {
    // TODO Shoot in spiral
    this.position[1] += this.speed * -0.05
  }
}
