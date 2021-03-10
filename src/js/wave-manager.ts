import Enemy01 from './objects/enemies/enemy01'
import Enemy02 from './objects/enemies/enemy02'
import Enemy03 from './objects/enemies/enemy03'
import Enemy04 from './objects/enemies/enemy04'

export default class WaveManager {
  private WAVE_COOLDOWN = 30
  private currentWave = 0
  private waveCooldown = 0

  public numberOfEnemies = 0

  private playing = false

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
    this.waveCooldown = this.WAVE_COOLDOWN

    // TODO Waves Logic

    /* for (let i = 0; i < this.currentWave * 2; i++) {
      new Enemy01()
      
    } */
  }
}
