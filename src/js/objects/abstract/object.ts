import { objectsInScene } from '../../../app'
export default abstract class Object {
  public static SHADER?: any
  protected loaded: boolean = false

  constructor() {
    objectsInScene.push(this)
  }

  abstract sendUniformVariables(): any

  abstract tick(elapsed: number): any

  abstract draw(): any

  abstract clear(): any
}
