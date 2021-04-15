import { Vector3 } from "../../../../../node_modules/@math.gl/core/src/index";
import GameManager from "../../../game-manager";
import WeaponUpgrade from "../../abstract/weapon-upgrade";
import BasicMissile from "../../projectiles/player/basic-missile";

export default class BasicWeaponUpgrade extends WeaponUpgrade {
  constructor(position: Vector3) {
    super("blue", position);
  }

  actionOnRelease(): void {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        this.shoot(this.gameManager.playerManager.player.getPosition());
      }, i * 100);
    }
  }

  private shoot(position: Vector3) {
    new BasicMissile(new Vector3(position.x, position.y - 0.07, 0.5), 15);
    new BasicMissile(
      new Vector3(position.x + 0.02, position.y - 0.07, 0.5),
      -15
    );
    new BasicMissile(new Vector3(position.x, position.y - 0.05, 0.5), 10);
    new BasicMissile(new Vector3(position.x, position.y - 0.05, 0.5), -10);
    new BasicMissile(new Vector3(position.x, position.y, 0.5));
    new BasicMissile(new Vector3(position.x + 0.04, position.y, 0.5));
    new BasicMissile(new Vector3(position.x - 0.04, position.y, 0.5));
  }
}
