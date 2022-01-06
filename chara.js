import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const chara = document.querySelector("[data-chara]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const CHARA_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping = false
let charaFrame = 0
let currentFrameTime = 0
let yVelocity = 0

export function setupChara() {
  isJumping = false
  charaFrame = 0
  currentFrameTime = 0
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateChara(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
} 
 
function handleRun(delta, speedScale) {
  if (isJumping) {
    chara.src = `imgs/chara-stationary.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    charaFrame = (charaFrame + 1) % CHARA_FRAME_COUNT
    chara.src = `imgs/chara-run-${charaFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return
  incrementCustomProperty(chara, "--bottom", yVelocity * delta)
  if (getCustomProperty(chara, "--bottom") <= 0) {
    setCustomProperty(chara, "--bottom", 0)
    isJumping = false
  }
  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return
  yVelocity = JUMP_SPEED
  isJumping = true
}
