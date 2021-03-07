import Enemy from '../abstract/enemy'

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default class Enemy01 extends Enemy {
  protected speed: number = 0.5
  public health = 10

  constructor(texture = 'Black1') {
    super(texture, 0.08, 0.08)
  }
}
