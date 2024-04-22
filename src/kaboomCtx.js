import kaboom from "kaboom";

export const kaboomConfig = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById('game')
})