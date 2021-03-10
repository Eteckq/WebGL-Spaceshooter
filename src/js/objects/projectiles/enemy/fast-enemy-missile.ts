import GameManager from '../../../game-manager'
import EnemyMissile from '../../abstract/enemy-missile'

export default class FastEnemyMissile extends EnemyMissile {
  d: number
  speedCoef: number
  xCoef: number
  yCoef: number
  constructor() {
    super('laserBlue09', 0.03, 0.03)
    // TODO Get player position and aim at it

    this.speed = 2
    let playerPosition = GameManager.Instance.playerManager.player.getPosition()
    
    
    this.d = Math.sqrt(
      Math.pow(playerPosition.x - this.getPosition().x, 2) +
        Math.pow(playerPosition.y - this.getPosition().y, 2)
    )

    this.speedCoef = this.speed / this.d

    this.xCoef = (playerPosition.x - this.getPosition().x) * 0.005
    this.yCoef = (playerPosition.y - this.getPosition().y) * 0.005
  }

  public update() {
    this.position[0] += this.xCoef * this.speedCoef
    this.position[1] += this.yCoef * this.speedCoef
  }
}
