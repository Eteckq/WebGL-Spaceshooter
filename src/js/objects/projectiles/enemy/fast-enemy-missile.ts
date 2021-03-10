import {
  Vector2,
  Vector3,
} from '../../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../../game-manager'
import { getDirection } from '../../../utils/utils'
import EnemyMissile from '../../abstract/enemy-missile'

export default class FastEnemyMissile extends EnemyMissile {
  speedCoef: number
  coef: Vector2
  constructor(position: Vector3) {
    super(position, 'laserBlue09', 0.03, 0.03)
    this.speed = 2
    let playerPosition = GameManager.Instance.playerManager.player.getPosition()

    let direction = getDirection(playerPosition, this.position)
    this.speedCoef = direction.speed
    this.coef = direction.coef
  }

  public update() {
    this.position[0] += this.coef.x * this.speedCoef * this.speed
    this.position[1] += this.coef.y * this.speedCoef * this.speed
  }
}
