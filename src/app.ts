import GameManager from './js/game-manager'

let gameManager: GameManager

function tick () {
  if (gameManager.over) {
    return
  }
  gameManager.tick()
  setTimeout(() => {
    requestAnimationFrame(tick);
  }, 1000 / 144);
}

// eslint-disable-next-line import/prefer-default-export
export function startGame () {
  gameManager = new GameManager()
  tick()
}
