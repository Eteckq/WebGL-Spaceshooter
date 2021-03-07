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
    this.waveCooldown = 100 * this.currentWave * 100

    for (let i = 0; i < this.currentWave * 2; i++) {
      new Enemy01()
      this.numberOfEnemies++
    }
  }
}
