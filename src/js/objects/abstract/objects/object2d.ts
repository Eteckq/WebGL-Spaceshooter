import { Vector3 } from "../../../../../node_modules/@math.gl/core/src/index";
import { gl } from "../../../utils/gl";
import Object from "./object";
export default abstract class Object2D extends Object {
  protected triangles: any;

  protected vertexBuffer: any;
  protected coordBuffer: any;

  protected vao: any;

  protected position: Vector3;
  protected time: number = 0;

  constructor(spawnPosition: Vector3) {
    super();
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    this.time = 0.0;
    this.position = spawnPosition.clone();
  }

  abstract sendUniformVariables(): any;

  abstract tick(elapsed: number): any;

  public draw() {
    if (this.loaded) {
      gl.bindVertexArray(this.vao);
      gl.drawElements(
        gl.TRIANGLES,
        this.triangles.numItems,
        gl.UNSIGNED_SHORT,
        0
      );
      gl.bindVertexArray(null);
    }
  }

  public clear() {
    // clear all GPU memory
    this.loaded = false;
    gl.deleteBuffer(this.vertexBuffer);
    gl.deleteBuffer(this.coordBuffer);
    gl.deleteVertexArray(this.vao);
    this.gameManager.removeFromScene(this);
  }
}
