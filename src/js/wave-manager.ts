import WeaponUpgrade from './objects/abstract/weapon-upgrade'
import BasicWeaponUpgrade from './objects/bonus/basic-weapon-upgrade'
import HealthBonus from './objects/bonus/health'
import SlotBonus from './objects/bonus/slot'
import WaveWeaponUpgrade from './objects/bonus/wave-weapon-upgrade'
import Enemy01 from './objects/enemies/enemy01'

export default class WaveManager {
  private currentWave = 0
  private waveCooldown = 200

  public numberOfEnemies = 0

  private playing = false

  private spawnableBonus: any = [
    WaveWeaponUpgrade,
    BasicWeaponUpgrade,
    // HealthBonus,
    SlotBonus,
  ]

  start() {
    this.playing = true
  }

  tick() {
    if (!this.playing) return
    this.waveCooldown--
    if (this.numberOfEnemies === 0) {
      this.waveCooldown = 0
    }

    if (this.waveCooldown <= 0) {
      this.spawnNewWave()
    }
  }

  private spawnNewWave() {
    this.currentWave++
    this.waveCooldown = 500
    console.log('WAVE')

    for (let i = 0; i < this.currentWave * 2; i++) {
      new Enemy01()
      this.numberOfEnemies++
    }

    for (let i = 0; i < 5; i++) {
      this.spawnRandomBonus()
    }
  }

  private spawnRandomBonus() {
    new this.spawnableBonus[
      Math.floor(Math.random() * this.spawnableBonus.length)
    ]()
  }
}
