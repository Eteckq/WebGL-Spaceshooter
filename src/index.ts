import './styles/index.scss'
import './js/wave-builder'
import * as $ from 'jquery'

import { initGL, gl } from './js/utils/gl'
import { startGame } from './app'
import { initAllShaders } from './js/utils/shaders-loader'
import view from './js/view'

// Call when pseudo set
async function start() {
  initGL()
  await initAllShaders()
  await startGame()
}

$(() => {
  $('.pseudoModal').on('keydown', (e: any) => {
    if (e.key === 'Enter') {
      setPseudo()
    }
  })

  $('#pseudoBtn').on('click', () => {
    setPseudo()
  })
})

function setPseudo() {
  let pseudo = $('#pseudoTxt').val().toString()

  if (pseudo !== '') {
    $('.pseudoModal').hide()
    view.pseudo = pseudo
    start()
  }
}
