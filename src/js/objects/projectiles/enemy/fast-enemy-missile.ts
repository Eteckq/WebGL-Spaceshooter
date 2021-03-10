import GameManager from '../../../game-manager'
import EnemyMissile from '../../abstract/enemy-missile'

export default class FastEnemyMissile extends EnemyMissile {
  private direction: { x: number; y: number }
  private xMissile: number
  private yMissile: number
  constructor() {
    super('laserBlue09', 0.03, 0.03)
    this.direction = {
      ...GameManager.Instance.playerManager.player.getPosition(),
    }
    this.speed = 0.7
  }

  public update() {
    let xPlayer = this.direction.x
    let yPlayer = this.direction.y

    let DeltaX = this.position[0] - xPlayer
    let DeltaY = this.position[1] - yPlayer

    console.log(DeltaX, DeltaY)

    // let distance = Math.sqrt(Math.pow(DeltaX, 2) + Math.pow(DeltaY, 2))
    // let vitesse = distance / this.time

    let newX = this.speed * -0.01 * DeltaX * this.time
    let newY = this.speed * -0.01 * DeltaY * this.time

    this.position[0] += newX
    this.position[1] += newY
  }
}
