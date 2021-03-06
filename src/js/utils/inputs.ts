let currentlyPressedKeys: any = {}

function handleKeyDown(event: { keyCode: string | number }) {
  currentlyPressedKeys[event.keyCode] = true
}

function handleKeyUp(event: { keyCode: string | number }) {
  currentlyPressedKeys[event.keyCode] = false
}

function handleInputs() {
  document.onkeydown = handleKeyDown
  document.onkeyup = handleKeyUp
}

handleInputs()

export default currentlyPressedKeys
