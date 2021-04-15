import { Vector3 } from "../../../../../node_modules/@math.gl/core/src/index";
import { getRandomFloat } from "../../../utils/utils";
import WeaponUpgrade from "../../abstract/weapon-upgrade";
import WaveMissile from "../../projectiles/player/wave-missile";

export default class WaveWeaponUpgrade extends WeaponUpgrade {
  constructor(position: Vector3) {
    super("green", position);
  }

  actionOnRelease(): void {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        this.spawnMissile(
          this.gameManager.playerManager.player.getPosition(),
          5,
          10
        );
      }, i * 50);
    }
  }

  private spawnMissile(position: Vector3, count: number, angleMax: number) {
    for (let i = 0; i < count; i++) {
      new WaveMissile(position, getRandomFloat(-angleMax, angleMax));
    }
  }
}
