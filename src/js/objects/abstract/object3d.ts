import { gl } from '../../utils/gl'
import * as glMatrix from 'gl-matrix'
import Object from './object'
import { getFile } from '../../utils/utils'
export default abstract class Object3D extends Object {
  public static SHADER?: any
  protected loaded: boolean = false

  protected triangles: any

  protected vertexBuffer: any
  protected normalBuffer: any

  protected vao: any

  protected bbmin = [0, 0, 0]
  protected bbmax = [0, 0, 0]
  protected bbminP = [0, 0, 0, 0]
  protected bbmaxP = [0, 0, 0, 0]

  protected position: [number, number, number] = [0, 0, 0]
  protected time: number = 0

  constructor() {
    super()
    this.vertexBuffer = gl.createBuffer()
    this.vertexBuffer.itemSize = 0
    this.vertexBuffer.numItems = 0

    this.normalBuffer = gl.createBuffer()
    this.normalBuffer.itemSize = 0
    this.normalBuffer.numItems = 0

    this.vao = gl.createVertexArray()
    gl.bindVertexArray(this.vao)

    this.time = 0.0
  }

  abstract sendUniformVariables(): any

  abstract tick(elapsed: number): any

  public draw() {
    if (this.loaded) {
      gl.bindVertexArray(this.vao)
      gl.drawArrays(gl.TRIANGLES, 0, this.vertexBuffer.numItems)
      gl.bindVertexArray(null)
    }
  }

  protected computeBoundingBox(vertices: any) {
    let i, j

    if (vertices.length >= 3) {
      this.bbmin = [vertices[0], vertices[1], vertices[2]]
      this.bbmax = [vertices[0], vertices[1], vertices[2]]
    }

    for (i = 3; i < vertices.length; i += 3) {
      for (j = 0; j < 3; j++) {
        if (vertices[i + j] > this.bbmax[j]) {
          this.bbmax[j] = vertices[i + j]
        }

        if (vertices[i + j] < this.bbmin[j]) {
          this.bbmin[j] = vertices[i + j]
        }
      }
    }
  }

  protected handleLoadedObject(objData: any) {
    let vertices = objData[0]
    let normals = objData[1]

    // console.log("Nb vertices: " + vertices.length / 3);

    this.computeBoundingBox(vertices)

    this.vao = gl.createVertexArray()
    gl.bindVertexArray(this.vao)

    // cree un nouveau buffer sur le GPU et l'active
    this.vertexBuffer = gl.createBuffer()
    this.vertexBuffer.itemSize = 3
    this.vertexBuffer.numItems = vertices.length / 3
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.enableVertexAttribArray(0)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.vertexAttribPointer(0, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0)

    this.normalBuffer = gl.createBuffer()
    this.normalBuffer.itemSize = 3
    this.normalBuffer.numItems = normals.length / 3
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer)
    gl.enableVertexAttribArray(1)
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW)
    gl.vertexAttribPointer(1, this.normalBuffer.itemSize, gl.FLOAT, false, 0, 0)

    gl.bindVertexArray(null)

    // console.log('model initialized')
    this.loaded = true
  }

  public clear() {
    // clear all GPU memory
    gl.deleteBuffer(this.vertexBuffer)
    gl.deleteBuffer(this.normalBuffer)
    gl.deleteVertexArray(this.vao)
    this.loaded = false
    this.gameManager.removeFromScene(this)
  }

  protected async load(filename: string) {
    // lecture du fichier, récupération des positions et des normales
    let data = await getFile(filename)

    let lines = data.split('\n')

    let positions: any = []
    let normals: any = []
    let arrayVertex: any = []
    let arrayNormal: any = []

    for (let i = 0; i < lines.length; i++) {
      let parts = lines[i].trimRight().split(' ')
      if (parts.length > 0) {
        switch (parts[0]) {
          case 'v':
            positions.push(
              glMatrix.vec3.fromValues(
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
              )
            )

            break
          case 'vn':
            normals.push(
              glMatrix.vec3.fromValues(
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
              )
            )
            break
          case 'f': {
            let f1 = parts[1].split('/')
            let f2 = parts[2].split('/')
            let f3 = parts[3].split('/')
            Array.prototype.push.apply(
              arrayVertex,
              positions[parseInt(f1[0]) - 1]
            )
            Array.prototype.push.apply(
              arrayVertex,
              positions[parseInt(f2[0]) - 1]
            )
            Array.prototype.push.apply(
              arrayVertex,
              positions[parseInt(f3[0]) - 1]
            )

            Array.prototype.push.apply(
              arrayNormal,
              normals[parseInt(f1[2]) - 1]
            )
            Array.prototype.push.apply(
              arrayNormal,
              normals[parseInt(f2[2]) - 1]
            )
            Array.prototype.push.apply(
              arrayNormal,
              normals[parseInt(f3[2]) - 1]
            )
            break
          }
          default:
            break
        }
      }
    }

    let objData = [new Float32Array(arrayVertex), new Float32Array(arrayNormal)]
    this.handleLoadedObject(objData)
  }
}
