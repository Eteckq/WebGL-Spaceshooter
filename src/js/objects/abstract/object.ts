import GameManager from '../../game-manager'
export default abstract class Object {
  public static SHADER?: any
  protected loaded: boolean = false

  protected gameManager: GameManager

  constructor() {
    this.gameManager = GameManager.Instance
    this.gameManager.addObject(this)
  }

  abstract sendUniformVariables(): any

  abstract tick(elapsed: number): any

  abstract draw(): any

  abstract clear(): any
}
