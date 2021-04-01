import Explosion from "../objects/explosion";
import Projectile from "../objects/abstract/objects/projectile";
import Rectangle from "../objects/abstract/objects/rectangle";
import Background from "../objects/background";
import Player from "../objects/player";
import { gl } from "./gl";
import { getFile } from "./utils";

// charge et compile les shaders
async function getShader(id: string, type: "fragment" | "vertex") {
  let shaderScript = await getFile(`/assets/shaders/${id}/${type}.glsl`);

  if (!shaderScript) {
    console.error("No shader is bind with id: " + id);
    return null;
  }

  let shader;
  if (type === "fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (type === "vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, shaderScript);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

async function initShaders(id: string) {
  // recupere les vertex et fragment shaders
  const fragmentShader = await getShader(`${id}`, "fragment");
  const vertexShader = await getShader(`${id}`, "vertex");

  // cree le programme et lui associe les vertex/fragments
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error("Could not initialize shaders");
  }

  return shaderProgram;
}

export async function initAllShaders() {
  Background.INIT_SHADERS(await initShaders("background"));
  Rectangle.INIT_SHADERS(await initShaders("rectangle"));
  Player.INIT_SHADERS(await initShaders("player"));
  Projectile.INIT_SHADERS(await initShaders("projectile"));
  Explosion.INIT_SHADERS(await initShaders("explosion"));
}
