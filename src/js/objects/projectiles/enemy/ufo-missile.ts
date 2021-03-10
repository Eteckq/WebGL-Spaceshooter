export default class Projectile extends EnemyMissile {
  xUfo: number
  yUfo: number
  b: any
  a: number
  
    

  constructor(ufoOrigin: { x: number; y: number }) {
    super('laserBlue09', 0.03, 0.03)

    this.xUfo = ufoOrigin.x
    this.yUfo = ufoOrigin.y
  }

  public update() {
    this.position[0] += (this.speed * (this.position[1] - this.b)) / this.a
    this.position[1] += this.speed * this.a * this.position[0] + this.b
  }

  setPosition(position: { x: number; y: any; z?: any }) {
    this.position[0] = position.x
    this.position[1] = position.y
    if (!position.z) {
      position.z = 0.99
    }
    this.position[2] = position.z

    this.init()
  }

  init(){
    this.speed = 0.03



    let xMissile = this.getPosition().x
    let yMissile = this.getPosition().y

    let deltaX = xMissile - this.xUfo
    let deltaY = yMissile - this.yUfo

    this.a = deltaY / deltaX
    this.b = this.yUfo - this.a * this.xUfo
  }
    getPosition() {
        throw new Error("Method not implemented.")
    }
}
