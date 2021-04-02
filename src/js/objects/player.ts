import { gl } from "../utils/gl";
import Object3D from "./abstract/objects/object3d";

import GameManager from "../game-manager";
import EnemyMissile from "./abstract/enemy-missile";
import Bonus from "./abstract/bonus";
import Enemy from "./abstract/enemy";

import {
  Matrix4,
  Vector3,
} from "../../../node_modules/@math.gl/core/src/index";
export default class Player extends Object3D {
  private modelMatrix: Matrix4;
  private viewMatrix: Matrix4;
  private projMatrix: Matrix4;

  private rotation: any;
  private scale: any;
  private acc: any;

  public color = new Vector3(0.8, 0.8, 0.2);

  constructor() {
    super();

    this.load("/assets/models/SmallSpaceFighter.obj");

    this.initParameters();
  }

  damage(amount: number): void {
    GameManager.Instance.playerManager.damage(amount);
  }

  protected onCollision(other: Object) {
    if (other instanceof EnemyMissile) {
      this.damage(other.attack);
      other.clear();
    }

    if (other instanceof Bonus) {
      other.actionOnCatch();
      other.clear();
    }

    if (other instanceof Enemy) {
      this.damage(other.attack);
      other.damage(50);
    }
  }

  public setRotation(rotation: number) {
    this.rotation = rotation;
  }

  private initParameters() {
    this.modelMatrix = new Matrix4(Matrix4.IDENTITY);
    this.viewMatrix = new Matrix4(Matrix4.IDENTITY);
    this.projMatrix = new Matrix4(Matrix4.IDENTITY);

    // la caméra est positionné sur l'axe Z et regarde le point 0,0,0
    this.viewMatrix = new Matrix4(Matrix4.IDENTITY).lookAt(
      [0, 0, 10],
      [0, 0, 0],
      [0, 1, 0]
    );

    //

    // matrice de projection perspective classique
    this.projMatrix = new Matrix4().perspective({
      fovy: 0.785398,
      aspect: 1,
      near: 0.1,
      far: 30,
    });

    // on utilise des variables pour se rappeler quelles sont les transformations courantes
    // rotation, translation, scaling de l'objet
    this.position = new Vector3(0, -3, 0); // position de l'objet dans l'espace
    this.rotation = 0; // angle de rotation en radian autour de l'axe Y
    this.scale = 0.2; // mise à l'echelle (car l'objet est trop  gros par défaut)

    this.acc = 0.0;
  }

  public sendUniformVariables() {
    // on envoie les matrices de transformation (model/view/proj) au shader
    // fonction appelée a chaque frame, avant le dessin du vaisseau
    if (this.loaded) {
      // Color
      gl.uniform3fv(Player.SHADER.color, this.color);

      gl.uniform1f(Player.SHADER.timerUniform, this.acc);

      let m = this.modelMatrix;
      let v = this.viewMatrix;
      let p = this.projMatrix;

      // envoie des matrices aux GPU
      gl.uniformMatrix4fv(
        Player.SHADER.modelMatrixUniform,
        false,
        this.modelMatrix
      );
      gl.uniformMatrix4fv(
        Player.SHADER.viewMatrixUniform,
        false,
        this.viewMatrix
      );
      gl.uniformMatrix4fv(
        Player.SHADER.projMatrixUniform,
        false,
        this.projMatrix
      );

      /*       
      this.bbminP.multiply([this.bbmin[0], this.bbmin[1], this.bbmin[2], 1])
      this.bbmaxP.multiply([this.bbmax[0], this.bbmax[1], this.bbmax[2], 1])

      this.bbminP.multiply(v)
      this.bbmaxP.multiply(v)
      this.bbminP.multiply(p)
      this.bbmaxP.multiply(p) 
      */

      multiplyVec4(
        m,
        [this.bbmin[0], this.bbmin[1], this.bbmin[2], 1],
        this.bbminP
      );
      multiplyVec4(
        m,
        [this.bbmax[0], this.bbmax[1], this.bbmax[2], 1],
        this.bbmaxP
      );
      multiplyVec4(v, this.bbminP);
      multiplyVec4(v, this.bbmaxP);
      multiplyVec4(p, this.bbminP);
      multiplyVec4(p, this.bbmaxP);

      this.bbminP[0] /= this.bbminP[3];
      this.bbminP[1] /= this.bbminP[3];
      this.bbminP[2] /= this.bbminP[3];
      this.bbminP[3] /= this.bbminP[3];

      this.bbmaxP[0] /= this.bbmaxP[3];
      this.bbmaxP[1] /= this.bbmaxP[3];
      this.bbmaxP[2] /= this.bbmaxP[3];
      this.bbmaxP[3] /= this.bbmaxP[3];
    }
  }

  public getBBox() {
    return [this.bbminP, this.bbmaxP];
  }

  static INIT_SHADERS(shader: any) {
    Player.SHADER = shader;

    // active ce shader
    gl.useProgram(shader);

    // adresse des variables de type uniform dans le shader
    shader.modelMatrixUniform = gl.getUniformLocation(shader, "uModelMatrix");
    shader.viewMatrixUniform = gl.getUniformLocation(shader, "uViewMatrix");
    shader.projMatrixUniform = gl.getUniformLocation(shader, "uProjMatrix");
    shader.color = gl.getUniformLocation(shader, "uColor");
    shader.timerUniform = gl.getUniformLocation(shader, "timer");
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed;

    let rMat = new Matrix4(Matrix4.IDENTITY).rotateAxis(this.rotation, [
      0,
      1,
      0,
    ]);
    let tMat = new Matrix4(Matrix4.IDENTITY).translate([
      this.position[0],
      this.position[1],
      this.position[2],
    ]);

    let sMat = new Matrix4(Matrix4.IDENTITY).scale([
      this.scale,
      this.scale,
      this.scale,
    ]);

    // on applique les transformations successivement
    this.modelMatrix = new Matrix4(Matrix4.IDENTITY);
    this.modelMatrix = this.modelMatrix.multiplyLeft(sMat);
    this.modelMatrix = this.modelMatrix.multiplyLeft(rMat);
    this.modelMatrix = this.modelMatrix.multiplyLeft(tMat);

    /* 

this.modelMatrix = new Matrix4(Matrix4.IDENTITY)
this.modelMatrix = this.modelMatrix.multiplyByScalar(sMat)
this.modelMatrix = this.modelMatrix.multiplyByScalar(rMat)
this.modelMatrix = this.modelMatrix.multiplyByScalar(tMat) */

    this.acc += 0.01;
  }

  public getPosition() {
    // exemple: comment positionner un splat devant le vaisseau
    let p = this.getBBox(); // boite englobante du vaisseau sur l'�cran
    let x = (p[0][0] + p[1][0]) / 2;
    let y = p[1][1];
    let z = p[1][2] + 0.005; // profondeur du splat (juste derri�re le vaisseau)

    return new Vector3(x, y, z);
  }

  public getSize() {
    return { height: 0.1, width: 0.1 };
  }

  public getBoundBox() {
    let { x, y } = this.getPosition();
    let { width, height } = this.getSize();
    return {
      x1: x - width / 2,
      x2: x + width / 2,
      y1: y - height * 2,
      y2: y - height * 1,
    };
  }
}

const multiplyVec4 = function (mat: number[], vec: any[], dest?: number[]) {
  if (!dest) {
    dest = vec;
  }

  let x = vec[0],
    y = vec[1],
    z = vec[2],
    w = vec[3];

  dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12] * w;
  dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13] * w;
  dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14] * w;
  dest[3] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15] * w;

  return dest;
};
