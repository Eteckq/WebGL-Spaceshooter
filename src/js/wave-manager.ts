import { Vector3 } from '../../node_modules/@math.gl/core/src/index'
import GameManager from './game-manager'
import Enemy from './objects/abstract/enemy'
import HealthBonus from './objects/bonus/consumables/health'
import SlotBonus from './objects/bonus/consumables/slot'
import BasicWeaponUpgrade from './objects/bonus/upgrades/basic-weapon-upgrade'
import BombWeaponUpgrade from './objects/bonus/upgrades/bomb-weapon-upgrade'
import WaveWeaponUpgrade from './objects/bonus/upgrades/wave-weapon-upgrade'
import BasicEnemy from './objects/enemies/basic'
import FastEnemy from './objects/enemies/fast'
import TankEnemy from './objects/enemies/tank'
import UfoEnemy from './objects/enemies/ufo'
import StrongEnemy from './objects/enemies/strong'
import view from './view'

class WaveEnemy {
  constructor(
    public enemy: typeof Enemy,
    public spawnAtWave: number,
    public startFreq: number = 1,
    public stopAtWave: number = 50
  ) {
    // this.stopAtWave *= 1 / this.startFreq
  }

  getFrequencyFromWave(wave: number) {
    if (this.spawnAtWave >= wave) {
      return 0
    }

    let freq =
      (-1 / this.stopAtWave) * (wave - 1 - this.spawnAtWave) + this.startFreq
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

  public static WavesEnemies: WaveEnemy[] = [
    new WaveEnemy(BasicEnemy, 0, 1),
    new WaveEnemy(FastEnemy, 5, 1),
    new WaveEnemy(TankEnemy, 10, 0.25),
    new WaveEnemy(UfoEnemy, 15, 0.8),
    new WaveEnemy(StrongEnemy, 20, 1),
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
    // console.log(this.currentWave)
    view.setWaves(this.currentWave)

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
    for (const waveEnemy of WaveManager.WavesEnemies) {
      let freq = waveEnemy.getFrequencyFromWave(this.currentWave)
      if (freq > 0) {
        pool.push({ enemy: waveEnemy.enemy, freq: freq })
        freqTotal += freq
      }
    }

    // console.log(
    //   'Wave ' +
    //     this.currentWave +
    //     ': ' +
    //     (3 + Math.round(GameManager.Instance.difficulty * 2))
    // )

    // Pick random enemies in pool
    for (let i = 0; i < Math.floor(GameManager.Instance.difficulty * 5); i++) {
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
      // console.log(pool[j].enemy.name + ' freq: ' + pool[j].freq)

      new pool[j].enemy()
    }
  }
}
