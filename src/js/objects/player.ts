import { gl } from '../utils/gl'
import Object3D from './abstract/object3d'
import * as glMatrix from 'gl-matrix'
import currentlyPressedKeys from '../utils/inputs'
import Splat from './splat'

export default class Player extends Object3D {
  public static COOLDOWN = 15

  private modelMatrix: any
  private viewMatrix: any
  private projMatrix: any

  private rotation: any
  private scale: any
  private acc: any

  private cooldown: number = 0

  constructor() {
    super()

    this.load('/assets/models/plane.obj')

    this.initParameters()
  }

  private initParameters() {
    this.modelMatrix = glMatrix.mat4.identity(glMatrix.mat4.create())
    this.viewMatrix = glMatrix.mat4.identity(glMatrix.mat4.create())
    this.projMatrix = glMatrix.mat4.identity(glMatrix.mat4.create())

    // la caméra est positionné sur l'axe Z et regarde le point 0,0,0
    this.viewMatrix = glMatrix.mat4.lookAt(
      glMatrix.mat4.create(),
      [0, 0, 10],
      [0, 0, 0],
      [0, 1, 0]
    )

    // matrice de projection perspective classique
    this.projMatrix = glMatrix.mat4.perspective(
      glMatrix.mat4.create(),
      45.0,
      1,
      0.1,
      30
    )

    // on utilise des variables pour se rappeler quelles sont les transformations courantes
    // rotation, translation, scaling de l'objet
    this.position = [0, 0, 0] // position de l'objet dans l'espace
    this.rotation = 0 // angle de rotation en radian autour de l'axe Y
    this.scale = 0.1 // mise à l'echelle (car l'objet est trop  gros par défaut)

    this.acc = 0.0
  }

  public sendUniformVariables() {
    // on envoie les matrices de transformation (model/view/proj) au shader
    // fonction appelée a chaque frame, avant le dessin du vaisseau
    if (this.loaded) {
      gl.uniform1f(Player.SHADER.timerUniform, this.acc)

      let m = this.modelMatrix
      let v = this.viewMatrix
      let p = this.projMatrix

      // envoie des matrices aux GPU
      gl.uniformMatrix4fv(
        Player.SHADER.modelMatrixUniform,
        false,
        this.modelMatrix
      )
      gl.uniformMatrix4fv(
        Player.SHADER.viewMatrixUniform,
        false,
        this.viewMatrix
      )
      gl.uniformMatrix4fv(
        Player.SHADER.projMatrixUniform,
        false,
        this.projMatrix
      )

      multiplyVec4(
        m,
        [this.bbmin[0], this.bbmin[1], this.bbmin[2], 1],
        this.bbminP
      )
      multiplyVec4(
        m,
        [this.bbmax[0], this.bbmax[1], this.bbmax[2], 1],
        this.bbmaxP
      )
      multiplyVec4(v, this.bbminP)
      multiplyVec4(v, this.bbmaxP)
      multiplyVec4(p, this.bbminP)
      multiplyVec4(p, this.bbmaxP)

      this.bbminP[0] /= this.bbminP[3]
      this.bbminP[1] /= this.bbminP[3]
      this.bbminP[2] /= this.bbminP[3]
      this.bbminP[3] /= this.bbminP[3]

      this.bbmaxP[0] /= this.bbmaxP[3]
      this.bbmaxP[1] /= this.bbmaxP[3]
      this.bbmaxP[2] /= this.bbmaxP[3]
      this.bbmaxP[3] /= this.bbmaxP[3]
    }
  }

  public getBBox() {
    return [this.bbminP, this.bbmaxP]
  }

  public tick(elapsed: number) {
    this.cooldown--

    this.handleInputs()
    this.time += 0.01 * elapsed

    let rMat = glMatrix.mat4.rotate(
      glMatrix.mat4.create(),
      glMatrix.mat4.identity(glMatrix.mat4.create()),
      this.rotation,
      [0, 1, 0]
    )
    let tMat = glMatrix.mat4.translate(
      glMatrix.mat4.create(),
      glMatrix.mat4.identity(glMatrix.mat4.create()),
      [this.position[0], this.position[1], this.position[2]]
    )
    let sMat = glMatrix.mat4.scale(
      glMatrix.mat4.create(),
      glMatrix.mat4.identity(glMatrix.mat4.create()),
      [this.scale, this.scale, this.scale]
    )

    // on applique les transformations successivement
    this.modelMatrix = glMatrix.mat4.identity(glMatrix.mat4.create())
    this.modelMatrix = multiply(sMat as any, this.modelMatrix)
    this.modelMatrix = multiply(rMat as any, this.modelMatrix)
    this.modelMatrix = multiply(tMat as any, this.modelMatrix)

    this.acc += 0.01
  }

  private handleInputs() {
    if (currentlyPressedKeys[68]) {
      // D
      this.move(1, 0)
    }

    if (currentlyPressedKeys[81]) {
      // Q
      this.move(-1, 0)
    }

    if (currentlyPressedKeys[90]) {
      // Z
      this.move(0, 1)
    }

    if (currentlyPressedKeys[83]) {
      // S
      this.move(0, -1)
    }

    if (currentlyPressedKeys[32]) {
      this.shoot()
    }
  }

  public shoot() {
    if (this.cooldown <= 0) {
      this.cooldown = Player.COOLDOWN
      let newSplat = new Splat()

      newSplat.setPosition(this.getCoords())
    }
  }

  public getCoords() {
    // exemple: comment positionner un splat devant le vaisseau
    let p = this.getBBox() // boite englobante du vaisseau sur l'�cran
    let x = (p[0][0] + p[1][0]) / 2
    let y = p[1][1]
    let z = p[1][2] + 0.005 // profondeur du splat (juste derri�re le vaisseau)

    return { x, y, z }
  }

  public move(x: number, y: number) {
    this.rotation = this.position[0] * 0.2

    if (this.position[0] > 4.1) {
      this.position[0] = -4.1
    }

    if (this.position[0] < -4.1) {
      this.position[0] = 4.1
    }

    if (this.position[1] + y > -4.1 && this.position[1] + y < 4.1) {
      this.position[1] += y * 0.1
    }

    this.position[0] += x * 0.1
  }
}

const multiplyVec4 = function (mat: number[], vec: any[], dest?: number[]) {
  if (!dest) {
    dest = vec
  }

  let x = vec[0],
    y = vec[1],
    z = vec[2],
    w = vec[3]

  dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12] * w
  dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13] * w
  dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14] * w
  dest[3] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15] * w

  return dest
}

const multiply = function (mat: any[], mat2: any[], dest?: number[]) {
  if (!dest) {
    dest = mat
  }

  // Cache the matrix values (makes for huge speed increases!)
  let a00 = mat[0],
    a01 = mat[1],
    a02 = mat[2],
    a03 = mat[3],
    a10 = mat[4],
    a11 = mat[5],
    a12 = mat[6],
    a13 = mat[7],
    a20 = mat[8],
    a21 = mat[9],
    a22 = mat[10],
    a23 = mat[11],
    a30 = mat[12],
    a31 = mat[13],
    a32 = mat[14],
    a33 = mat[15],
    b00 = mat2[0],
    b01 = mat2[1],
    b02 = mat2[2],
    b03 = mat2[3],
    b10 = mat2[4],
    b11 = mat2[5],
    b12 = mat2[6],
    b13 = mat2[7],
    b20 = mat2[8],
    b21 = mat2[9],
    b22 = mat2[10],
    b23 = mat2[11],
    b30 = mat2[12],
    b31 = mat2[13],
    b32 = mat2[14],
    b33 = mat2[15]

  dest[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30
  dest[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31
  dest[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32
  dest[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33
  dest[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30
  dest[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31
  dest[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32
  dest[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33
  dest[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30
  dest[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31
  dest[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32
  dest[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33
  dest[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30
  dest[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31
  dest[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32
  dest[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33

  return dest
}
