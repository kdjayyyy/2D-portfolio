import { kaboomConfig } from "./kaboomCtx";

// spritesheet is a 16 x 16 tile
// vite will by default search for the .png from the public folder
kaboomConfig.loadSprite('spritesheet', './spritesheet.png', {
  sliceX: 39, // x frames in the image
  sliceY: 31,
  anims: {
    'idle-down': 936,
    'walk-down': {from: 936, to: 939, loop: true, speed: 8},
    'idle-side': 975,
    'walk-side': {from: 975, to: 978, loop: true, speed: 8},
    'idle-up': 1014,
    'walk-up': {from: 1014, to: 1017, loop: true, speed: 8}
  }
})
