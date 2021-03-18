import Object from './objects/abstract/objects/object'
import { gl } from './utils/gl'
import Rectangle from './objects/abstract/objects/rectangle'
import Background from './objects/background'
import Player from './objects/player'
import Enemy from './objects/abstract/enemy'
import WaveManager from './wave-manager'
import View from './view'
import Bonus from './objects/abstract/bonus'
import PlayerManager from './player-manager'
import Hitbox from './objects/hitbox'
import PlayerMissile from './objects/abstract/player-missile'
import EnemyMissile from './objects/abstract/enemy-missile'
import view from './view'
import { Vector3 } from '../../node_modules/@math.gl/core/src/index'
import Projectile from './objects/abstract/objects/projectile'
import BasicEnemyMissile from './objects/projectiles/enemy/basic-enemy-missile'

const DEBUG = false

export default class GameManager {
  private objectsInScene: Object[] = []

  public difficulty = 1

  static Instance: GameManager
  public playerManager: PlayerManager

  public waveManager: WaveManager

  public over: boolean = false

  private score: number = 0

  constructor() {
    GameManager.Instance = this

    this.playerManager = new PlayerManager()
    if (DEBUG) new Hitbox(0.03, 0.03)
    new Background()
    this.waveManager = new WaveManager()
    View.setScore(0)
    View.setWaves(0)

    // Wait 3s before starting waves
    setTimeout(() => {
      this.waveManager.start()
    }, 3000)
  }

  public killEnemy(enemy: Enemy) {
    this.waveManager.numberOfEnemies--
    this.score += enemy.score
    View.setScore(this.score)
  }

  public getClosestEnemy(from?: Vector3): Enemy {
    let enemies: Enemy[] = this.objectsInScene.filter(
      (o) => o instanceof Enemy
    ) as Enemy[]
    if (!from) {
      from = this.playerManager.player.getPosition()
    }

    let closest: Enemy
    let tinyestD = 10
    for (const enemy of enemies) {
      let enemyPosition = enemy.getPosition()
      let d = from.distance(enemyPosition)
      if (tinyestD > d) {
        tinyestD = d
        closest = enemy
      }
    }

    return closest
  }

  public gameOver() {
    this.over = true
    this.destroy()
    view.sendScore(this.score)
  }

  public tick() {
    if (this.over) return
    this.checkCollisions()

    this.draw()
    this.animate()
    this.waveManager.tick()
    this.playerManager.tick()
  }

  // Pour les collisions, je teste uniquement les objets qui peuvent entrer en collision (évite de surcharger)
  private checkCollisions() {
    this.objectsInScene.map((object) => {
      // uncomment to debug hitboxs

      if (DEBUG && object instanceof Hitbox) {
        object.checkCollisions(this.objectsInScene)
      }

      if (object instanceof Enemy) {
        object.checkCollisions(
          this.objectsInScene.filter((o) => o instanceof PlayerMissile)
        )
      }
    })

    this.playerManager.player.checkCollisions(
      this.objectsInScene.filter(
        (o) =>
          o instanceof EnemyMissile || o instanceof Bonus || o instanceof Enemy
      )
    )
  }

  // Used by objects

  public addObject(object: Object) {
    this.objectsInScene.push(object)
  }

  public removeFromScene(object: Object) {
    this.objectsInScene = this.objectsInScene.filter((o) => o.id !== object.id)
  }

  // WEB GL

  private lastTime: number = 0
  private animate() {
    let timeNow = new Date().getTime()
    if (this.lastTime != 0) {
      let elapsed = timeNow - this.lastTime
      this.objectsInScene.forEach((object) => {
        object.tick(elapsed)
      })
    }
    this.lastTime = timeNow
  }

  private draw() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight)
    // eslint-disable-next-line no-bitwise
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.enable(gl.BLEND)

    this.objectsInScene.forEach((object) => {
      if (object instanceof Background) {
        gl.disable(gl.BLEND)
        gl.useProgram(Background.SHADER)
        gl.enable(gl.BLEND)
      }
      if (object instanceof Rectangle) {
        gl.useProgram(Rectangle.SHADER)
      }
      if (object instanceof Player) {
        gl.useProgram(Player.SHADER)
      }
      if (object instanceof Projectile) {
        gl.useProgram(Projectile.SHADER)
      }

      object.sendUniformVariables()
      object.draw()
    })
  }

  public destroy() {
    this.objectsInScene.forEach((object) => {
      object.clear()
    })
  }
}
