import { Vector3 } from "../../../../../node_modules/@math.gl/core/src/index";
import WeaponUpgrade from "../../abstract/weapon-upgrade";
import RafalMissile from "../../projectiles/player/rafal-missile";

export default class RafalWeaponUpgrade extends WeaponUpgrade {
  constructor(position: Vector3) {
    super("yellow", position);
  }

  actionOnRelease(): void {
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        this.shoot(this.gameManager.playerManager.player.getPosition());
      }, i * 50);
    }
  }

  private shoot(position: Vector3) {
    new RafalMissile(position);
    new RafalMissile(position);
  }
}
