import './styles/index.scss'
import * as $ from 'jquery'

import { initGL, gl } from './js/utils/gl'
import { startGame } from './app'
import { initAllShaders } from './js/utils/shaders-loader'

// eslint-disable-next-line no-unused-vars
$(async () => {
  initGL()
  await initAllShaders()
  startGame()
})
