import Object from './abstract/object'
import { gl } from '../utils/gl'

export default class Background extends Object {
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
    var vertices = [
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

    var coords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]

    var tri = [0, 1, 2, 0, 2, 3]

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

    this.offset[1] += 0.005
    this.persistence = 0.5 + 0.2 * Math.sin(this.time)
    this.frequency = 4.0 - 2.0 * Math.sin(this.time)
  }

  public sendUniformVariables() {
    gl.uniform2fv(Background.SHADER.offsetUniform, this.offset)
    gl.uniform1f(Background.SHADER.amplitudeUniform, this.amplitude)
    gl.uniform1f(Background.SHADER.frequencyUniform, this.frequency)
    gl.uniform1f(Background.SHADER.persistenceUniform, this.persistence)
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
