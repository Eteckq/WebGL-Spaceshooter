import { Vector3 } from '../../node_modules/@math.gl/core/src/index'
import Weapon from './objects/abstract/weapon'
import WeaponUpgrade from './objects/abstract/weapon-upgrade'
import BasicWeaponUpgrade from './objects/bonus/upgrades/basic-weapon-upgrade'
import BombWeaponUpgrade from './objects/bonus/upgrades/bomb-weapon-upgrade'
import WaveWeaponUpgrade from './objects/bonus/upgrades/wave-weapon-upgrade'
import BasicWeapon from './objects/weapons/basic-weapon'
import BombWeapon from './objects/weapons/bomb-weapon'
import WaveWeapon from './objects/weapons/wave-weapon'
import RafalWeapon from './objects/weapons/rafal-weapon'
import view from './view'
import RafalWeaponUpgrade from './objects/bonus/upgrades/rafal-weapon-upgrade'

export default class WeaponManager {
  private upgrades: WeaponUpgrade[] = [
    new RafalWeaponUpgrade(new Vector3(Vector3.ZERO)),
  ]

  private maxBonusSlots: number = 8
  private currentBonusSlots: number = 3

  private weapons = {
    basic: new BasicWeapon(),
    wave: new WaveWeapon(),
    bomb: new BombWeapon(),
    rafal: new RafalWeapon(),
  }

  basicWeaponLevel: number = 1
  waveWeaponLevel: number = 0
  bombWeaponlevel: number = 0
  rafalWeaponlevel: number = 0

  constructor() {
    this.updateLevels()
  }

  public addSlot() {
    if (this.currentBonusSlots < this.maxBonusSlots) {
      this.currentBonusSlots++
      this.updateLevels()
    }
    return this.currentBonusSlots === this.maxBonusSlots
  }

  public pushUpgrade(upgrade: WeaponUpgrade) {
    if (this.upgrades.length === this.currentBonusSlots) {
      this.removeLastUpgrade()
    }
    this.upgrades.unshift(upgrade)
    this.updateLevels()
  }

  private updateLevels() {
    //
    this.basicWeaponLevel =
      1 +
      this.upgrades.filter((upgrade) => upgrade instanceof BasicWeaponUpgrade)
        .length
    //
    this.waveWeaponLevel = this.upgrades.filter(
      (upgrade) => upgrade instanceof WaveWeaponUpgrade
    ).length
    //
    this.bombWeaponlevel = this.upgrades.filter(
      (upgrade) => upgrade instanceof BombWeaponUpgrade
    ).length
    //
    this.rafalWeaponlevel = this.upgrades.filter(
      (upgrade) => upgrade instanceof RafalWeaponUpgrade
    ).length
    let bonusPngs = []
    for (const upgrade of this.upgrades) {
      bonusPngs.push(upgrade.textureName)
    }

    while (bonusPngs.length < this.currentBonusSlots) {
      bonusPngs.push(`/assets/images/UI/slot.png`)
    }
    view.setBonus(bonusPngs)
  }

  public removeLastUpgrade() {
    this.activatePower(this.upgrades.pop())
  }

  // On SHIFT
  public removeFirstUpgrade() {
    if (this.upgrades.length === 0) return
    this.activatePower(this.upgrades.shift())
    this.updateLevels()
  }

  private activatePower(upgrade: WeaponUpgrade) {
    // TODO Active power when throw bonus
  }

  public tick() {
    for (const key in this.weapons) {
      const weapon: Weapon = (this.weapons as any)[key]
      weapon.tick()
    }
  }

  // On Space
  public shoot(position: Vector3) {
    this.weapons.basic.shoot(position, this.basicWeaponLevel)
    this.weapons.wave.shoot(position, this.waveWeaponLevel)
    this.weapons.bomb.shoot(position, this.bombWeaponlevel)
    this.weapons.rafal.shoot(position, this.rafalWeaponlevel)
  }
}
