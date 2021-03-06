// eslint-disable-next-line no-var
// eslint-disable-next-line import/no-mutable-exports
let gl: any = null

function initGL() {
  const canvas: any = document.getElementById('SpaceShip')
  try {
    gl = canvas.getContext('webgl2')

    gl.viewportWidth = canvas.width
    gl.viewportHeight = canvas.height
  } catch (e) {
    console.error(e)
  }

  gl.clearColor(0.3, 0.3, 0.3, 1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
}

export { gl, initGL }
