/* eslint-disable no-console */
import { gl } from './gl'

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

export function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min
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

export function getFile(filename: string): Promise<string> {
  let xmlhttp = new XMLHttpRequest()

  return new Promise((resolve, reject) => {
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
          let data = xmlhttp.responseText
          resolve(data)
        } else {
          reject(xmlhttp.status)
        }
      }
    }

    xmlhttp.open('GET', filename, true)
    xmlhttp.send()
  })
}
