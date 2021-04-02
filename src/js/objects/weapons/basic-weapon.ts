import { Vector3 } from "../../../../node_modules/@math.gl/core/src/index";
import Weapon from "../abstract/weapon";
import BasicMissile from "../projectiles/player/basic-missile";

export default class BasicWeapon extends Weapon {
  constructor() {
    super();
    this.SHOOT_COOLDOWN = 25;
  }

  public use(position: Vector3, level: number) {
    if (level >= 5) {
      this.shootCooldown -= 4 * (level - 4);
    }
    switch (level) {
      case 1:
        this.shootLevel1(position);
        break;
      case 2:
        this.shootLevel2(position);
        break;
      case 3:
        this.shootLevel3(position);
        break;
      default:
        this.shootLevel4(position);
        break;
    }
  }

  private shootLevel1(position: Vector3) {
    new BasicMissile(position);
  }
  private shootLevel2(position: Vector3) {
    new BasicMissile(new Vector3(position.x - 0.02, position.y, 0.5));
    new BasicMissile(new Vector3(position.x + 0.02, position.y, 0.5));
  }
  private shootLevel3(position: Vector3) {
    this.shootLevel2(position);

    new BasicMissile(new Vector3(position.x, position.y - 0.05, 0.5), 10);
    new BasicMissile(new Vector3(position.x, position.y - 0.05, 0.5), -10);
  }
  private shootLevel4(position: Vector3) {
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
