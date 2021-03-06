// Test import of a JavaScript function
// import test from './js/example'

// Test import of an asset
/* import webpackLogo from './images/webpack-logo.svg'
const logo = document.createElement('img')
logo.src = webpackLogo */

// Test import of styles

/* // Appending to the DOM

const heading = document.createElement('h1')
heading.textContent = example()

const app = document.querySelector('#root')
app.append(logo, heading) */

import './styles/index.scss'
import $ from 'jquery'

import { initGL, gl } from './js/utils/gl.ts'
import { initShaders } from './js/utils/utils.ts'
import { startGame } from './app.ts'

import Rectangle from './js/objects/abstract/rectangle.ts'
import Player from './js/objects/player.ts'
import Background from './js/objects/background.ts'

function initRectangleShaders() {
  const shader = initShaders('rectangle')
  Rectangle.SHADER = shader

  // active ce shader
  gl.useProgram(shader)

  // adresse des variables uniform dans le shader
  shader.positionUniform = gl.getUniformLocation(shader, 'uPosition')
  shader.texUniform = gl.getUniformLocation(shader, 'uTex')
  shader.couleurUniform = gl.getUniformLocation(shader, 'maCouleur')
}

function initPlayerShaders() {
  const shader = initShaders('player')
  Player.SHADER = shader

  // active ce shader
  gl.useProgram(shader)

  // adresse des variables de type uniform dans le shader
  shader.modelMatrixUniform = gl.getUniformLocation(shader, 'uModelMatrix')
  shader.viewMatrixUniform = gl.getUniformLocation(shader, 'uViewMatrix')
  shader.projMatrixUniform = gl.getUniformLocation(shader, 'uProjMatrix')
  shader.timerUniform = gl.getUniformLocation(shader, 'timer')
}

function initBackgroundShaders() {
  const shader = initShaders('background')
  Background.SHADER = shader
  // active ce shader
  gl.useProgram(shader)

  // adresse des variables dans le shader associé
  shader.offsetUniform = gl.getUniformLocation(shader, 'uOffset')
  shader.amplitudeUniform = gl.getUniformLocation(shader, 'uAmplitude')
  shader.frequencyUniform = gl.getUniformLocation(shader, 'uFrequency')
  shader.persistenceUniform = gl.getUniformLocation(shader, 'uPersistence')
}

function initAllShaders() {
  initBackgroundShaders()
  initRectangleShaders()
  initPlayerShaders()
}

// eslint-disable-next-line no-unused-vars
$(() => {
  initGL()
  initAllShaders()
  startGame()
})
