// export function displayDialogue(text, onDisplayEnd) {
//   const dialogueUI = document.getElementById("textbox-container");
//   const dialogue = document.getElementById("dialogue");

//   // this changes the style of the textbox-container div, from its default none -> block
//   dialogueUI.style.display = "block";

//   // constructing the text scrolling function
//   let index = 0;
//   let currTxt = "";
//   const intervalRef = setInterval(() => {
//     // using the setInterval function to go over each of the text strings in the text array
//     // appending the oncoming strings to the currTxt string
//     if(index < text.length) {
//       currTxt += text[index];
//       dialogue.innerHTML = currTxt;
//       index++;
//       return;
//     }
//     clearInterval(intervalRef);
//   }, 1);

//   // now implementing the close button function
//   const closeBtn = document.getElementById("close");

//   function onCloseBtnClick() {
//     onDisplayEnd();
//     dialogueUI.style.display = "none";
//     dialogue.innerHTML = "";
//     clearInterval(intervalRef);
//     closeBtn.removeEventListener("click", onCloseBtnClick);
//   }
  
//   closeBtn.addEventListener("click", onCloseBtnClick);

//   addEventListener("keypress", (key) => {
//     if(key.code === "Enter") {
//       closeBtn.click();
//     }
//   });
// }

// export function setCamScale(k) {
//   const resizeFactor = k.width() / k.height();
//   if(resizeFactor < 1) {
//     k.camScale(k.vec2(1));
//   }
//   else k.camScale(k.vec2(1.5));
// }

export function displayDialogue(text, onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");

  dialogueUI.style.display = "block";
  let index = 0;
  let currentText = "";
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }

    clearInterval(intervalRef);
  }, 1);

  const closeBtn = document.getElementById("close");

  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
  }

  closeBtn.addEventListener("click", onCloseBtnClick);

  addEventListener("keypress", (key) => {
    if (key.code === "Enter") {
      closeBtn.click();
    }
  });
}

export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
}

