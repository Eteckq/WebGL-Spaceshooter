import Rectangle from '../objects/abstract/rectangle'
import Background from '../objects/background'
import Player from '../objects/player'
import { gl } from './gl'
import { getFile } from './utils'

// charge et compile les shaders
async function getShader(id: string, type: 'fragment' | 'vertex') {
  let shaderScript = await getFile(`/assets/shaders/${id}/${type}.glsl`)

  if (!shaderScript) {
    console.error('No shader is bind with id: ' + id)
    return null
  }

  let shader
  if (type === 'fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER)
  } else if (type === 'vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER)
  } else {
    return null
  }

  gl.shaderSource(shader, shaderScript)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    return null
  }

  return shader
}

async function initShaders(id: string) {
  // recupere les vertex et fragment shaders
  const fragmentShader = await getShader(`${id}`, 'fragment')
  const vertexShader = await getShader(`${id}`, 'vertex')

  // cree le programme et lui associe les vertex/fragments
  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Could not initialize shaders')
  }

  return shaderProgram
}

async function initRectangleShaders() {
  const shader = await initShaders('rectangle')
  Rectangle.SHADER = shader

  // active ce shader
  gl.useProgram(shader)

  // adresse des variables uniform dans le shader
  shader.positionUniform = gl.getUniformLocation(shader, 'uPosition')
  shader.texUniform = gl.getUniformLocation(shader, 'uTex')
  shader.couleurUniform = gl.getUniformLocation(shader, 'maCouleur')
}

async function initPlayerShaders() {
  const shader = await initShaders('player')
  Player.SHADER = shader

  // active ce shader
  gl.useProgram(shader)

  // adresse des variables de type uniform dans le shader
  shader.modelMatrixUniform = gl.getUniformLocation(shader, 'uModelMatrix')
  shader.viewMatrixUniform = gl.getUniformLocation(shader, 'uViewMatrix')
  shader.projMatrixUniform = gl.getUniformLocation(shader, 'uProjMatrix')
  shader.timerUniform = gl.getUniformLocation(shader, 'timer')
}

async function initBackgroundShaders() {
  const shader = await initShaders('background')
  Background.SHADER = shader
  // active ce shader
  gl.useProgram(shader)

  // adresse des variables dans le shader associé
  shader.offsetUniform = gl.getUniformLocation(shader, 'uOffset')
  shader.amplitudeUniform = gl.getUniformLocation(shader, 'uAmplitude')
  shader.frequencyUniform = gl.getUniformLocation(shader, 'uFrequency')
  shader.persistenceUniform = gl.getUniformLocation(shader, 'uPersistence')
}

export async function initAllShaders() {
  await initBackgroundShaders()
  await initRectangleShaders()
  await initPlayerShaders()
}
