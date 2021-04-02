import { Vector3 } from "../../../../../node_modules/@math.gl/core/src/index";
import GameManager from "../../../game-manager";
import Enemy from "../../abstract/enemy";
import PlayerMissile from "../../abstract/player-missile";

export default class RafalMissile extends PlayerMissile {
  target: Enemy;
  p0: Vector3;
  p1: Vector3 = new Vector3(0.7, 0, 0.5);

  constructor(position: Vector3) {
    super(position, `rafal`, 0.015, 0.015);
    this.attack = 2;
    this.p0 = this.getPosition();
    this.target = GameManager.Instance.getClosestEnemy();
    this.speed = 2;
  }

  public update() {
    if (!this.target || !this.target.loaded) {
      this.clear();
      return;
    }

    this.p1.x = -this.target.getPosition().x;
    this.p1.y = this.target.getPosition().y - 0.3;

    let t = this.time * 0.08 * this.speed;
    if (t > 1) {
      this.clear();
      return;
    }

    let p2 = new Vector3(0, 0.8, 0.5);
    if (this.target) {
      p2 = this.target.getPosition();
    }

    let x =
      Math.pow(1 - t, 2) * this.p0.x +
      2 * (1 - t) * t * this.p1.x +
      Math.pow(t, 2) * p2.x;
    let y =
      Math.pow(1 - t, 2) * this.p0.y +
      2 * (1 - t) * t * this.p1.y +
      Math.pow(t, 2) * p2.y;

    this.position[0] = x;
    this.position[1] = y;
  }
}
