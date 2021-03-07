import Enemy from '../abstract/enemy'

export default class Enemy01 extends Enemy {
  protected speed: number = 0.5
  public health = 10

  constructor(texture = 'Black1') {
    super(texture, 0.08, 0.08)
  }
}
