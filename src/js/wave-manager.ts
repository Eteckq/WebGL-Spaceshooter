import { Vector3 } from '../../node_modules/@math.gl/core/src/index'
import GameManager from './game-manager'
import Enemy from './objects/abstract/enemy'
import HealthBonus from './objects/bonus/consumables/health'
import SlotBonus from './objects/bonus/consumables/slot'
import BasicWeaponUpgrade from './objects/bonus/upgrades/basic-weapon-upgrade'
import BombWeaponUpgrade from './objects/bonus/upgrades/bomb-weapon-upgrade'
import WaveWeaponUpgrade from './objects/bonus/upgrades/wave-weapon-upgrade'
import Enemy01 from './objects/enemies/enemy01'
import Enemy02 from './objects/enemies/enemy02'
import Enemy03 from './objects/enemies/enemy03'
import Enemy04 from './objects/enemies/enemy04'
import Enemy05 from './objects/enemies/enemy05'

class WaveEnemy {
  constructor(
    public enemy: typeof Enemy,
    public spawnAtWave: number,
    public stopAtWave: number = 50
  ) {}

  getFrequencyFromWave(wave: number) {
    if (this.spawnAtWave >= wave) {
      return 0
    }

    let freq = (-1 / this.stopAtWave) * (wave - 1 - this.spawnAtWave) + 1
    if (freq < 0) {
      return 0
    }

    return freq
  }
}

export default class WaveManager {
  private WAVE_COOLDOWN = 300
  private currentWave = 0
  private waveCooldown = 0

  public numberOfEnemies = 0

  private playing = false

  private wavesEnemies: WaveEnemy[] = [
    new WaveEnemy(Enemy01, 0),
    new WaveEnemy(Enemy02, 5),
    new WaveEnemy(Enemy03, 10),
    new WaveEnemy(Enemy04, 15),
    new WaveEnemy(Enemy05, 20),
  ]

  public spawnableBonus: any[] = [
    WaveWeaponUpgrade,
    BasicWeaponUpgrade,
    BombWeaponUpgrade,
    HealthBonus,
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
    if (this.currentWave >= 70) return

    if (this.currentWave % 3 === 0) {
      new this.spawnableBonus[
        Math.floor(Math.random() * this.spawnableBonus.length)
      ](new Vector3(0, 1, 0.5))
    }

    this.currentWave++
    GameManager.Instance.difficulty += 0.01
    this.waveCooldown = this.WAVE_COOLDOWN

    let pool: { enemy: any; freq: number }[] = []
    let freqTotal = 0
    for (const waveEnemy of this.wavesEnemies) {
      let freq = waveEnemy.getFrequencyFromWave(this.currentWave)
      if (freq > 0) {
        pool.push({ enemy: waveEnemy.enemy, freq: freq })
        freqTotal += freq
      }
    }

    // Pick random enemies in pool
    for (
      let i = 0;
      i < 3 + Math.round(GameManager.Instance.difficulty * 2);
      i++
    ) {
      let actual = 0
      let freqRdm = Math.random() * freqTotal
      let j = 0
      if (!pool[j]) {
        console.error('No more waves available !')
        return
      }
      while (pool[j].freq + actual < freqRdm) {
        actual += pool[j].freq
        j += 1
      }
      new pool[j].enemy()
    }
  }
}
