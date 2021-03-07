import Weapon from './objects/abstract/weapon'
import WeaponUpgrade from './objects/abstract/weapon-upgrade'
import BasicWeapon from './objects/weapons/basic-weapon'
import WaveWeapon from './objects/weapons/wave-weapon'
import view from './view'

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

  constructor() {
    this.updateLevels()
  }

  public addSlot() {
    if (this.currentBonusSlots < this.maxBonusSlots) {
      this.currentBonusSlots++
      this.updateLevels()
    }
  }

  public pushUpgrade(upgrade: typeof WeaponUpgrade) {
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
      this.upgrades.filter((upgrade) => upgrade.name === 'BasicWeaponUpgrade')
        .length
    //
    this.waveWeaponLevel = this.upgrades.filter(
      (upgrade) => upgrade.name === 'WaveWeaponUpgrade'
    ).length
    let bonusPngs = []
    for (let i = 0; i < this.upgrades.length; i++) {
      const upgrade = this.upgrades[i]
      if (upgrade.name === 'BasicWeaponUpgrade') {
        bonusPngs.push(`/assets/images/PNG/Power-ups/powerupBlue.png`)
      }
      if (upgrade.name === 'WaveWeaponUpgrade') {
        bonusPngs.push(`/assets/images/PNG/Power-ups/powerupGreen.png`)
      }
    }

    while (bonusPngs.length < this.currentBonusSlots) {
      bonusPngs.push(`/assets/images/PNG/Power-ups/star_silver.png`)
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
