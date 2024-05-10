import kaboom from "kaboom";
import { scaleFactor } from "./constant";
import { kaboomConfig } from "./kaboomCtx";

// the spritesheet is a 16 x 16 tile
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

kaboomConfig.loadSprite('map', './map.png');
// setting the default background colour of the application from here
kaboomConfig.setBackground(kaboomConfig.Color.fromHex('#311047'));

// to create the scene, the function has been named as main
kaboomConfig.scene('main', async () => {
  // convert the map data to json data
  const mapData = await (await fetch('./map.json')).json();
  const layers = mapData.layers;

  // map definition
  const map = kaboomConfig.make([
    kaboomConfig.sprite('map'),
    kaboomConfig.pos(0),
    kaboomConfig.scale(scaleFactor)
  ])

  // default player definition
  const player = kaboomConfig.make([
    // the default animation of the sprite is 'idle-down'
    kaboomConfig.sprite('spritesheet', {anim: 'idle-down'}),
    kaboomConfig.area({
      shape: new kaboomConfig.Rect(kaboomConfig.vec2(0, 3), 10, 10),
    }),
    kaboomConfig.body(),
    kaboomConfig.anchor('center'),
    kaboomConfig.pos(),
    kaboomConfig.scale(scaleFactor),
    {
      // movement configuration
      speed: 250,
      direction: 'down',
      isInDialogue: false, // making so that the player is able to move in case a dialogue is running
    },
    'player', 
  ]);

  // define a for loop for 
  for(const layer of layers) {
    if(layer.name === 'boundaries') {
      for(const boundary of layer.objects) {
        map.add([
          kaboomConfig.area({
            // making a new instance of the Rect class from kaboomConfig
            shape: new kaboomConfig.Rect(kaboomConfig.vect2(0), boundary.width, boundary.height)
          }),
          // body property -> the player will not be able to pass over
          kaboomConfig.body({isStatic: true}),
          kaboomConfig.pos(boundary.x, boundary.y),
          // name of the tiled object, as defined in the tiled software
          boundary.name
        ]);
        
        // if the boundary name is a valid one
        if(boundary.name) {
          player.onCollide(boundary.name, () => {
            // to prevent the player from moving when the textbox is being displayed
            player.isInDialogue = true;

          });
        }
      }
    }
  }

});

// the default functionality of the .scene function
kaboomConfig.go('main');

