import Bonus from './objects/abstract/bonus'
import AttackSpeedBonus from './objects/bonus/basic-weapon-upgrade'
import HealthBonus from './objects/bonus/health'
import Enemy01 from './objects/enemies/enemy01'

export default class WaveManager {
  private currentWave = 0
  private waveCooldown = 200

  public numberOfEnemies = 0

  private playing = false

  constructor() {}

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

    if (true) {
      this.spawnRandomBonus()
    }
  }

  private spawnRandomBonus() {
    let bonus = [AttackSpeedBonus, HealthBonus]
    new bonus[Math.floor(Math.random() * bonus.length)]()
  }
}
