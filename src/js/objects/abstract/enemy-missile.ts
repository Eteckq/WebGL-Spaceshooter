import Missile from './missile'

export default abstract class EnemyMissile extends Missile {
  constructor(texture: string, width: number, height: number) {
    super(`/assets/images/PNG/Missiles/Enemy/${texture}.png`, width, height)
  }
}
