import { Vector3 } from '../../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../../game-manager'
import Enemy from '../../abstract/enemy'
import PlayerMissile from '../../abstract/player-missile'

export default class BombMissile extends PlayerMissile {
  target: Enemy
  p0: Vector3
  p1: Vector3 = new Vector3(0.7, 0, 0.5)

  constructor(position: Vector3, gap: number = 0.5) {
    super(position, `laserRed08`, 0.03, 0.03)
    this.attack = 30
    this.target = GameManager.Instance.getClosestEnemy()
    this.p0 = this.getPosition()
    if (this.target) {
      this.p1 = this.getPosition()
    }
    this.p1.x += gap
    this.p1.y += 0.1
    this.speed = 1
  }

  public update() {
    let t = this.time * 0.08 * this.speed
    if (t > 1) {
      this.clear()
      return
    }

    let p2 = new Vector3(0, 0.8, 0.5)
    if (this.target) {
      p2 = this.target.getPosition()
    }

    let x =
      Math.pow(1 - t, 2) * this.p0.x +
      2 * (1 - t) * t * this.p1.x +
      Math.pow(t, 2) * p2.x
    let y =
      Math.pow(1 - t, 2) * this.p0.y +
      2 * (1 - t) * t * this.p1.y +
      Math.pow(t, 2) * p2.y

    this.position[0] = x
    this.position[1] = y
  }
}
