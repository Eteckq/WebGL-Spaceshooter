import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import GameManager from '../../game-manager'
export default abstract class Object {
  public static SHADER?: any
  protected loaded: boolean = false

  public id: string = '#' + Math.random() * 10000 + '#'

  protected gameManager: GameManager

  constructor() {
    this.gameManager = GameManager.Instance
    this.gameManager.addObject(this)
  }

  public getBoundBox() {
    let { x, y } = this.getPosition()
    let { width, height } = this.getSize()
    return {
      x1: x - width,
      x2: x + width,
      y1: y - height,
      y2: y + height,
    }
  }

  abstract getPosition(): Vector3

  abstract getSize(): {
    width: number
    height: number
  }

  checkCollisions(objects: Object[]) {
    objects.forEach((object) => {
      if (object !== this) {
        if (
          isColliding({ ...this.getBoundBox() }, { ...object.getBoundBox() })
        ) {
          this.onCollision(object)
        }
      }
    })
  }

  protected onCollision(other: Object) {
    console.log('Collision not handled !')
  }

  abstract sendUniformVariables(): any

  abstract tick(elapsed: number): any

  abstract draw(): any

  abstract clear(): any
}

function isColliding(
  rect2: {
    x1: number
    x2: number
    y1: number
    y2: number
  },
  rect1: {
    x1: number
    x2: number
    y1: number
    y2: number
  }
): boolean {
  if (
    rect1.x1 < rect2.x2 &&
    rect1.x2 > rect2.x1 &&
    rect1.y1 < rect2.y2 &&
    rect1.y2 > rect2.y1
  ) {
    return true
  }
  return false
}
