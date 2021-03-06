import { gl } from './js/utils/gl'
import Object from './js/objects/abstract/object'
import Splat from './js/objects/splat'
import Player from './js/objects/player'
import Background from './js/objects/background'
import Rectangle from './js/objects/abstract/rectangle'
import Enemy from './js/objects/enemy'

export const objectsInScene: Object[] = []

function draw() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight)
  // eslint-disable-next-line no-bitwise
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // gl.enable(gl.BLEND)

  objectsInScene.forEach((object) => {
    if (object instanceof Background) {
      gl.useProgram(Background.SHADER)
    }
    if (object instanceof Rectangle) {
      gl.useProgram(Rectangle.SHADER)
    }
    if (object instanceof Player) {
      gl.useProgram(Player.SHADER)
    }

    object.sendUniformVariables()
    object.draw()
  })
}

function tick() {
  window.requestAnimationFrame(tick)
  draw()
  animate()
}

var lastTime = 0
function animate() {
  var timeNow = new Date().getTime()
  if (lastTime != 0) {
    var elapsed = timeNow - lastTime
    objectsInScene.forEach((object) => {
      object.tick(elapsed)
    })
  }
  lastTime = timeNow
}

// eslint-disable-next-line import/prefer-default-export
export function startGame() {
  // const splat = new Splat()
  const enemy = new Enemy()
  const player = new Player()
  const back = new Background()

  tick()
}
