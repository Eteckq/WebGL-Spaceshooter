import Weapon from './objects/abstract/weapon'
import WeaponUpgrade from './objects/abstract/weapon-upgrade'
import BasicWeapon from './objects/weapons/basic-weapon'
import WaveWeapon from './objects/weapons/wave-weapon'

export default class WeaponManager {
  private upgrades: typeof WeaponUpgrade[] = []

  private maxBonusSlots: number = 8
  private currentBonusSlots: number = 3

  private weapons = {
    basic: new BasicWeapon(),
    wave: new WaveWeapon(),
  }

  basicWeaponLevel: number = 1
  waveWeaponLevel: number = 0

  public addSlot() {
    if (this.currentBonusSlots < this.maxBonusSlots) {
      this.currentBonusSlots++
    }
  }

  public pushUpgrade(upgrade: typeof WeaponUpgrade) {
    if (this.upgrades.length === this.currentBonusSlots) {
      this.removeLastUpgrade()
    }
    this.upgrades.push(upgrade)
    this.updateLevels()
  }

  private updateLevels() {
    //
    this.basicWeaponLevel =
      1 +
      this.upgrades.filter((upgrade) => upgrade.name === 'BasicWeaponUpgrade')
        .length
    //
    this.waveWeaponLevel = this.upgrades.filter(
      (upgrade) => upgrade.name === 'WaveWeaponUpgrade'
    ).length
  }

  public removeLastUpgrade() {
    this.activatePower(this.upgrades.shift())
  }

  // On SHIFT
  public removeFirstUpgrade() {
    if (this.upgrades.length === 0) return
    this.activatePower(this.upgrades.pop())
    this.updateLevels()
  }

  private activatePower(upgrade: typeof WeaponUpgrade) {
    console.log('Power: ', upgrade)
  }

  public tick() {
    for (const key in this.weapons) {
      const weapon: Weapon = (this.weapons as any)[key]
      weapon.tick()
    }
  }

  // On Space
  public shoot(position: { x: number; y: number; z: number }) {
    this.weapons.basic.shoot(position, this.basicWeaponLevel)
    this.weapons.wave.shoot(position, this.waveWeaponLevel)
  }
}
