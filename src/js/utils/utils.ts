/* eslint-disable no-console */
import { gl } from './gl'
import rectangleShaders from '../shaders/rectangle'
import playerShaders from '../shaders/player'
import backgroundShaders from '../shaders/background'

function handleLoadedTexture(texture: any) {
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    texture.image
  )
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.bindTexture(gl.TEXTURE_2D, null)
}

export function initTexture(filename: string, width: number, height: number) {
  const texture = gl.createTexture()
  texture.image = new Image()

  texture.image.onload = () => {
    handleLoadedTexture(texture)
    texture.width = width
    texture.height = height
  }

  texture.image.src = filename
  return texture
}

// charge et compile les shaders
function getShader(id: string) {
  let shaderScript
  if (id === 'rectangle-fs') {
    shaderScript = rectangleShaders.fs
  }
  if (id === 'rectangle-vs') {
    shaderScript = rectangleShaders.vs
  }
  if (id === 'player-fs') {
    shaderScript = playerShaders.fs
  }
  if (id === 'player-vs') {
    shaderScript = playerShaders.vs
  }
  if (id === 'background-fs') {
    shaderScript = backgroundShaders.fs
  }
  if (id === 'background-vs') {
    shaderScript = backgroundShaders.vs
  }

  if (!shaderScript) {
    console.error('No shader is bind with id: ' + id)
    return null
  }

  let shader
  if (shaderScript.type === 'fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER)
  } else if (shaderScript.type === 'vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER)
  } else {
    return null
  }

  gl.shaderSource(shader, shaderScript.str)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    return null
  }

  return shader
}

export function initShaders(id: string) {
  // recupere les vertex et fragment shaders
  const fragmentShader = getShader(`${id}-fs`)
  const vertexShader = getShader(`${id}-vs`)

  // cree le programme et lui associe les vertex/fragments
  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Could not initialise shaders')
  }

  return shaderProgram
}
