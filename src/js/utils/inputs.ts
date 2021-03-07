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

let allowed = true
let onShiftCallback: any

$(document).keydown((event: any) => {
  if (event.keyCode !== 16) return
  if (event.repeat != undefined) {
    allowed = !event.repeat
  }

  if (!allowed) return
  allowed = false
  onShiftCallback()
})

$(document).keyup((e) => {
  allowed = true
})

handleInputs()

export function registerOnShiftCallback(cb: any) {
  onShiftCallback = cb
}

export { currentlyPressedKeys }
