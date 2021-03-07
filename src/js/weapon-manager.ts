import GameManager from './game-manager'
import Weapon from './objects/abstract/weapon'
import BasicWeapon from './objects/weapons/basic-weapon'
import WaveWeapon from './objects/weapons/wave-weapon'

export default class WeaponManager {
  private weapons = {
    basic: new BasicWeapon(),
    wave: new WaveWeapon(),
  }

  public basicWeaponUpgrade() {
    this.weapons.basic.levelUp()
  }

  public waveWeaponUpgrade() {
    this.weapons.wave.levelUp()
  }

  public tick() {
    for (const key in this.weapons) {
      const weapon: Weapon = (this.weapons as any)[key]
      weapon.tick()
    }
  }

  public shoot() {
    for (const key in this.weapons) {
      const weapon: Weapon = (this.weapons as any)[key]
      weapon.shoot(GameManager.Instance.playerManager.player.getPosition())
    }
  }
}
