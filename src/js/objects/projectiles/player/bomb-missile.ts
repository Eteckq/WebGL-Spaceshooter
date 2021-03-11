import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../../game-manager'
import Enemy from '../../abstract/enemy'
import PlayerMissile from '../../abstract/player-missile'

export default class BombMissile extends PlayerMissile {
  target: Enemy
  spanwPos: Vector3

  constructor(position: Vector3) {
    super(position, `laserRed08`, 0.03, 0.03)
    this.attack = 30
    this.target = GameManager.Instance.getClosestEnemy()
    this.spanwPos = this.getPosition()

    this.speed = 0.2
  }

  public update() {
    let t = this.time * 0.08
    console.log(t)
    if (t > 1) {
      this.clear()
      return
    }

    let targetPos = new Vector3(0, 0.8, 0.5)
    if (this.target) {
      targetPos = this.target.getPosition()
    }

    let actualPos = this.position

    actualPos.lerp(this.spanwPos, targetPos, t)

    this.position[0] = actualPos.x
    this.position[1] = actualPos.y
  }
}
