/* eslint-disable no-console */
import {
  Vector2,
  Vector3,
} from "../../../node_modules/@math.gl/core/src/index";
import { gl } from "./gl";

function handleLoadedTexture(texture: any) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    texture.image
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

export function generateOdds(number: number) {
  return Math.round(Math.random() * number) === 0;
}

export function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export function getRandomBoolValue() {
  return Math.round(Math.random()) === 0 ? 1 : -1;
}

export function getDirection(p1: Vector3, p2: Vector3) {
  let d = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

  let speedCoef = 1 / d;

  let xCoef = (p1.x - p2.x) * 0.005;
  let yCoef = (p1.y - p2.y) * 0.005;

  return { coef: new Vector2(xCoef, yCoef), speed: speedCoef };
}

export function initTexture(filename: string, width: number, height: number) {
  const texture = gl.createTexture();
  texture.image = new Image();

  texture.image.onload = () => {
    handleLoadedTexture(texture);
    texture.width = width;
    texture.height = height;
  };

  texture.image.src = filename;
  return texture;
}

export function getFile(filename: string): Promise<string> {
  let xmlhttp = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
          let data = xmlhttp.responseText;
          resolve(data);
        } else {
          reject(xmlhttp.status);
        }
      }
    };

    xmlhttp.open("GET", filename, true);
    xmlhttp.send();
  });
}
