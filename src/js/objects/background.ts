import Object from './abstract/objects/object'
import { gl } from '../utils/gl'
import GameManager from '../game-manager'
import { Vector3 } from '../../../node_modules/@math.gl/core/src/index'

export default class Background extends Object {
  checkCollisions(objects: Object[]) {}
  getPosition(): Vector3 {
    return new Vector3(0, 0, 0)
  }
  getSize(): { width: number; height: number } {
    return { width: 0, height: 0 }
  }

  protected speed: number = 0.5

  protected offset: any
  protected persistence: any
  protected amplitude: any
  protected frequency: any

  protected time: any

  protected vertexBuffer: any
  protected coordBuffer: any
  protected triangles: any

  protected vao: any

  constructor() {
    super()
    this.time = 0
    this.offset = [0.0, 0.0]
    this.amplitude = 5.0
    this.frequency = 4.0
    this.persistence = 0.5

    // un tableau contenant les positions des sommets (sur CPU donc)
    let vertices = [
      -1.0,
      -1.0,
      0.9999,
      1.0,
      -1.0,
      0.9999,
      1.0,
      1.0,
      0.9999,
      -1.0,
      1.0,
      0.9999,
    ]

    let coords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]

    let tri = [0, 1, 2, 0, 2, 3]

    this.vao = gl.createVertexArray()
    gl.bindVertexArray(this.vao)

    // cree un nouveau buffer sur le GPU et l'active
    this.vertexBuffer = gl.createBuffer()
    this.vertexBuffer.itemSize = 3
    this.vertexBuffer.numItems = 4
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.enableVertexAttribArray(0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.vertexAttribPointer(0, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0)

    // meme principe pour les coords de texture
    this.coordBuffer = gl.createBuffer()
    this.coordBuffer.itemSize = 2
    this.coordBuffer.numItems = 4
    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer)
    gl.enableVertexAttribArray(1)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW)
    gl.vertexAttribPointer(1, this.coordBuffer.itemSize, gl.FLOAT, false, 0, 0)

    // creation des faces du cube (les triangles) avec les indices vers les sommets
    this.triangles = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangles)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tri), gl.STATIC_DRAW)
    this.triangles.numItems = 6

    gl.bindVertexArray(null)
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    this.persistence = 0.5 + 0.2 * Math.sin(this.time)
    this.frequency = 4.0 - 2.0 * Math.sin(this.time)
  }

  public static INIT_SHADERS(shader: any): void {
    {
      Background.SHADER = shader
      gl.useProgram(shader)
      shader.time = gl.getUniformLocation(shader, 'uTime')
      shader.resolution = gl.getUniformLocation(shader, 'uResolution')
      shader.offset = gl.getUniformLocation(shader, 'uOffset')
    }
  }
  public sendUniformVariables() {
    gl.uniform1f(Background.SHADER.time, this.time * 0.5)
    gl.uniform2fv(Background.SHADER.resolution, [1, 1])

    gl.uniform2fv(Background.SHADER.offset, [
      GameManager.Instance.playerManager.player.getPosition().x * 0.3,
      this.time * 0.05,
    ])
  }
  public draw() {
    gl.bindVertexArray(this.vao)
    gl.drawElements(gl.TRIANGLES, this.triangles.numItems, gl.UNSIGNED_SHORT, 0)
    gl.bindVertexArray(null)
  }

  public clear() {
    gl.deleteBuffer(this.vertexBuffer)
    gl.deleteBuffer(this.coordBuffer)
    gl.deleteVertexArray(this.vao)
    this.loaded = false
  }
}
