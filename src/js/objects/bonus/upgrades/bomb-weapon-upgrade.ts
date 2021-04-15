import { Vector3 } from "../../../../../node_modules/@math.gl/core/src/index";
import WeaponUpgrade from "../../abstract/weapon-upgrade";
import BombMissile from "../../projectiles/player/bomb-missile";

export default class BombWeaponUpgrade extends WeaponUpgrade {
  constructor(position: Vector3) {
    super("red", position);
  }

  actionOnRelease(): void {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.shoot(this.gameManager.playerManager.player.getPosition());
      }, i * 1500);
    }
  }

  private shoot(position: Vector3) {
    new BombMissile(position, 0.2);
    new BombMissile(position, -0.2);
    new BombMissile(position, 0.5);
    new BombMissile(position, -0.5);
    new BombMissile(position, 0.7);
    new BombMissile(position, -0.7);
  }
}
