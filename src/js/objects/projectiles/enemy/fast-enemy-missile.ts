import GameManager from '../../../game-manager'
import EnemyMissile from '../../abstract/enemy-missile'

export default class FastEnemyMissile extends EnemyMissile {
  constructor() {
    super('laserBlue09', 0.03, 0.03)
    // TODO Get player position and aim at it

    this.speed = 0.7
    let playerPosition = GameManager.Instance.playerManager.player.getPosition()
    console.log(playerPosition)
  }

  public update() {
    this.position[1] += this.speed * -0.05
    this.position[0] += this.speed * 0.0007
  }
}
