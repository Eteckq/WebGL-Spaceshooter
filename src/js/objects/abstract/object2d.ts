import { gl } from '../../utils/gl'
import Object from './object'
export default abstract class Object2D extends Object {
  protected triangles: any

  protected vertexBuffer: any
  protected coordBuffer: any

  protected vao: any

  protected position: [number, number, number] = [0, 0, 0]
  protected time: number = 0

  constructor() {
    super()
    this.vao = gl.createVertexArray()
    gl.bindVertexArray(this.vao)

    this.time = 0.0
  }

  abstract sendUniformVariables(): any

  abstract tick(elapsed: number): any

  public draw() {
    if (this.loaded) {
      gl.bindVertexArray(this.vao)
      gl.drawElements(
        gl.TRIANGLES,
        this.triangles.numItems,
        gl.UNSIGNED_SHORT,
        0
      )
      gl.bindVertexArray(null)
    }
  }

  public clear() {
    // clear all GPU memory
    gl.deleteBuffer(this.vertexBuffer)
    gl.deleteBuffer(this.coordBuffer)
    gl.deleteVertexArray(this.vao)
    this.loaded = false
    this.gameManager.removeFromScene(this)
  }
}
