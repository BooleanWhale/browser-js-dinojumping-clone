const chara = document.querySelector("[data-chara]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.011
const CHARA_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping = false
let charaFrame = 0
let currentFrameTime = 0

export function setupChara() {
  isJumping = false
  charaFrame = 0
  currentFrameTime = 0
}

export function updateChara(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump()
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    chara.src = `img/chara-stationary.png`
    return
  }
  if (currentFrameTime >= FRAME_TIME) {
    charaFrame = (charaFrame + 1) % CHARA_FRAME_COUNT
    chara.src = `imgs/chara-run-${charaFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump() {

} 