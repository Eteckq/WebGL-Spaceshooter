import GameManager from './js/game-manager'

let gameManager: GameManager

function tick() {
  if (gameManager.over) {
    return
  }

  window.requestAnimationFrame(tick)
  gameManager.tick()
}

// eslint-disable-next-line import/prefer-default-export
export function startGame() {
  gameManager = new GameManager()
  tick()
}
