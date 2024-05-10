// import { dialogueData, scaleFactor } from "./constant";
// import { k } from "./kaboomCtx";
// import { displayDialogue, setCamScale } from "./utils";


// k.loadSprite("spritesheet", "./spritesheet.png", {
//   sliceX: 39, // x frames in the image
//   sliceY: 31,
//   anims: {
//     "idle-down": 936,
//     "walk-down": {from: 936, to: 939, loop: true, speed: 8},
//     "idle-side": 975,
//     "walk-side": {from: 975, to: 978, loop: true, speed: 8},
//     "idle-up": 1014,
//     "walk-up": {from: 1014, to: 1017, loop: true, speed: 8}
//   },
// });

// k.loadSprite("map", "./map.png");
// k.setBackground(k.Color.fromHex("#311047")); 


// // to create the scene, the function has been named as main
// k.scene("main", async () => {
//   // convert the map data to json data
//   const mapData = await (await fetch("./map.json")).json();
//   const layers = mapData.layers;

//   // map definition
//   const map = k.add([
//     k.sprite("map"),
//     k.pos(0),
//     k.scale(scaleFactor)
//   ]);


//   // default player definition
//   const player = k.make([
//     // the default animation of the sprite is "idle-down"
//     k.sprite("spritesheet", { anim: "idle-down" }),
//     k.area({
//       shape: new k.Rect(k.vec2(0, 3), 10, 10),
//     }),
//     k.body(),
//     k.anchor("center"),
//     k.pos(),
//     k.scale(scaleFactor),
//     {
//       // movement configuration
//       speed: 250,
//       direction: "down",
//       isInDialogue: false, // making so that the player is able to move in case a dialogue is running
//     },
//     "player", 
//   ]);


//   for(const layer of layers) {
//     if(layer.name === "boundaries") {
//       for(const boundary of layer.objects) {
//         map.add([
//           k.area({
//             // making a new instance of the Rect class from k
//             shape: new k.Rect(k.vect2(0), boundary.width, boundary.height)
//           }),
//           // body property -> the player will not be able to pass over
//           k.body({isStatic: true}),
//           k.pos(boundary.x, boundary.y),
//           // name of the tiled object, as defined in the tiled software
//           boundary.name
//         ]);
        
//         // if the boundary name is a valid onee
//         // player spawn +  player movement logic
//         if(boundary.name) {
//           player.onCollide(boundary.name, () => {
//             // to prevent the player from moving when the textbox is being displayed
//             player.isInDialogue = true;
//             // so that the player can move again after displaying and ending the dialogue
//             displayDialogue(dialogueData[boundary.name], () => (player.isInDialogue = false));
//           });
//         }
//       }
//       continue;
//     }

//     if(layer.name === "spawnpoints") {
//       for(const entity of layer.objects) {
//         if(entity.name === "player") {
//           player.pos = k.vec2(
//             (map.pos.x + entity.x) * scaleFactor,
//             (map.pos.y + entity.y) * scaleFactor
//           );
//           k.add(player);
//           continue;
//         }
//       }
//     }
//   }

//   setCamScale(k);
//   k.onResize(() => {
//     setCamScale(k);
//   });

//   // to make the camera follow the player in the UI
//   k.onUpdate(() => {
//     // worldPos() to configure acc to the absolute position in the canvas
//     k.camPos(player.worldPos().x, player.worldPos().y - 100);
//   });

//   k.onMouseDown((mouseBtn) => {
//     // don"t move
//     if(mouseBtn !== "left" || player.isInDialogue) return;

//     const worldMousePos = k.toWorld(k.mousePos());
//     player.moveTo(worldMousePos, player.speed); 

//     const mouseAngle = player.pos.angle(worldMousePos);
//     const lowerBound = 50;
//     const upperBound = 125;

//     // up
//     if(mouseAngle > lowerBound && mouseAngle < upperBound && player.curAnim() !== "walk-up") {
//       player.play("walk-up");
//       player.direction = "up";
//       return;
//     }

//     // down
//     if(mouseAngle < -lowerBound && mouseAngle > -upperBound && player.curAnim() !== "walk-down") {
//       player.play("walk-down");
//       player.direction = "down";
//       return;
//     }

//     // right
//     if(Math.abs(mouseAngle) > upperBound) {
//       player.flipX = false;
//       if(player.curAnim() !== "walk-side") {
//         player.play("walk-side");
//       }
//       player.direction = "right";
//       return;
//     }
 
//     // left
//     if(Math.abs(mouseAngle) < lowerBound) {
//       player.flipX = true;
//       if(player.curAnim() !== "walk-side") {
//         player.play("walk-side");
//       }
//       player.direction = "left";
//       return;
//     }
//   });

//   function stopAnims() {
//     if(player.direction === "down") {
//       player.play("idle-down");
//       return;
//     }
//     if(player.direction === "up") {
//       player.play("idle-up");
//       return;
//     }
//     player.play("idle-side");
//   }

//   k.onMouseRelease(stopAnims);

//   k.onKeyRelease(() => {
//     stopAnims();
//   });

//   k.onKeyDown((key) => {
//     const keyMap = [
//       k.isKeyDown("right"),
//       k.isKeyDown("left"),
//       k.isKeyDown("up"),
//       k.isKeyDown("down"),
//     ];

//     let nbOfKeyPressed = 0;
//     for(const key of keyMap) {
//       if(key) nbOfKeyPressed++;
//     }

//     if(nbOfKeyPressed > 1) return;

//     if(player.isInDialogue) return;

//     if(keyMap[0]) {
//       player.flipX = false;
//       if(player.curAnim() !== "walk-side") player.play("walk-side");
//       player.direction = "right";
//       player.move(player.speed, 0);
//       return;
//     }

//     if(keyMap[1]) {
//       player.flipX = true;
//       if(player.curAnim() !== "walk-side") player.play("walk-side");
//       player.direction = "left";
//       player.move(-player.speed, 0);
//       return;
//     }

//     if(keyMap[2]) {
//       if(player.curAnim() !== "walk-up") player.play("walk-up");
//       player.direction = "up";
//       player.move(0, -player.speed);
//       return;
//     }

//     if(keyMap[3]) {
//       if(player.curAnim() !== "walk-down") player.play("walk-down");
//       player.direction = "down";
//       player.move(0, player.speed);
//     }
//   });
// });

// 
// k.go("main");

import { dialogueData, scaleFactor } from "./constant";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";

// the spritesheet is a 16 x 16 tile
// vite will by default search for the .png from the public folder
k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});

k.loadSprite("map", "./map.png");

k.setBackground(k.Color.fromHex("#311047"));

// for creating the main scene of the UI
k.scene("main", async () => {
  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

  // default player configuration
  const player = k.make([
    // default sprite for the player upon loading is idle-down
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 10, 10),
    }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor),
    {
      // movement configuration
      speed: 250,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ]);

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        // if the boundary name is a valid onee
        // player spawn +  player movement logic
        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;
            displayDialogue(
              dialogueData[boundary.name],
              () => (player.isInDialogue = false)
            );
          });
        }
      }

      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  // to make the camera follow the player in the UI
  k.onUpdate(() => {
    k.camPos(player.worldPos().x, player.worldPos().y - 100);
  });

  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    const lowerBound = 50;
    const upperBound = 125;

    if (
      mouseAngle > lowerBound &&
      mouseAngle < upperBound &&
      player.curAnim() !== "walk-up"
    ) {
      player.play("walk-up");
      player.direction = "up";
      return;
    }

    if (
      mouseAngle < -lowerBound &&
      mouseAngle > -upperBound &&
      player.curAnim() !== "walk-down"
    ) {
      player.play("walk-down");
      player.direction = "down";
      return;
    }

    if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      return;
    }

    if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      return;
    }
  });

  function stopAnims() {
    if (player.direction === "down") {
      player.play("idle-down");
      return;
    }
    if (player.direction === "up") {
      player.play("idle-up");
      return;
    }

    player.play("idle-side");
  }

  k.onMouseRelease(stopAnims);

  k.onKeyRelease(() => {
    stopAnims();
  });
  k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;

    if (player.isInDialogue) return;

    // right
    if (keyMap[0]) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    // left
    if (keyMap[1]) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    // up
    if (keyMap[2]) {
      if (player.curAnim() !== "walk-up") player.play("walk-up");
      player.direction = "up";
      player.move(0, -player.speed);
      return;
    }

    // down
    if (keyMap[3]) {
      if (player.curAnim() !== "walk-down") player.play("walk-down");
      player.direction = "down";
      player.move(0, player.speed);
    }
  });
});

// for executing the created scene 
k.go("main");
