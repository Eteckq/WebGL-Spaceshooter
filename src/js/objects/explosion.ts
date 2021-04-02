import { Vector3 } from "../../../node_modules/@math.gl/core/src/index";
import { gl } from "../utils/gl";
import { initTexture } from "../utils/utils";
import Object2D from "./abstract/objects/object2d";

export default class Explosion extends Object2D {
  protected speed: number = 0.4;
  protected customHitboxScale: { width: number; height: number };
  protected textures: WebGLTexture[];

  protected state = 0;
  private tState = 0;

  constructor(
    position: Vector3,
    protected width: number = 0.15,
    protected height: number = 0.15
  ) {
    super(position);

    this.textures = [];

    for (let i = 0; i < 19; i++) {
      this.textures.push(
        initTexture(
          `/assets/images/Explosions/${i}.png`,
          this.width,
          this.height
        )
      );
    }

    let wo2 = this.width;
    let ho2 = this.height;

    this.customHitboxScale = { width: this.width, height: this.height };

    // TRectangle
    let vertices = [
      -wo2,
      -ho2,
      -0.8,
      wo2,
      -ho2,
      -0.8,
      wo2,
      ho2,
      -0.8,
      -wo2,
      ho2,
      -0.8,
    ];

    let coords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];

    let tri = [0, 1, 2, 0, 2, 3];

    // cree un nouveau buffer sur le GPU et l'active
    this.vertexBuffer = gl.createBuffer();
    this.vertexBuffer.itemSize = 3;
    this.vertexBuffer.numItems = 4;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.enableVertexAttribArray(0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(
      0,
      this.vertexBuffer.itemSize,
      gl.FLOAT,
      false,
      0,
      0
    );

    // meme principe pour les coords
    this.coordBuffer = gl.createBuffer();
    this.coordBuffer.itemSize = 2;
    this.coordBuffer.numItems = 4;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
    gl.enableVertexAttribArray(1);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
    gl.vertexAttribPointer(1, this.coordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // creation des faces du cube (les triangles) avec les indices vers les sommets
    this.triangles = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangles);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(tri),
      gl.STATIC_DRAW
    );
    this.triangles.numItems = tri.length;

    this.loaded = true;
  }

  public sendUniformVariables() {
    if (this.loaded) {
      gl.uniform3fv(Explosion.SHADER.positionUniform, this.position);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textures[this.state]);
      gl.uniform1i(Explosion.SHADER.texUniform, 0);
    }
  }

  public getSize() {
    return this.customHitboxScale;
  }

  setPosition(position: Vector3) {
    this.position[0] = position.x;
    this.position[1] = position.y;
    this.position[2] = position.z;
  }

  public static INIT_SHADERS(shader: any): void {
    {
      Explosion.SHADER = shader;

      // active ce shader
      gl.useProgram(shader);

      // adresse des variables uniform dans le shader
      shader.positionUniform = gl.getUniformLocation(shader, "uPosition");
    }
  }

  public getPosition() {
    return this.position.clone();
  }

  public tick(elapsed: number) {
    this.tState++;
    if (this.tState % 2 === 0) {
      this.state++;
    }

    if (this.state > 19) {
      this.clear();
      return;
    }
  }
}
