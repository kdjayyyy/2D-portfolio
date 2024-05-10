const displayDialogue = (text, onDisplayEnd) => {
  const dialogueUI = document.getElementById('textbox-container');
  const dialogue = document.getElementById('dialogue');

  // this changes the style of the textbox-container div, from its default none -> block
  dialogueUI.style.display = 'block';

  // constructing the text scrolling function
  let index = 0;
  let currTxt = '';
  const intervalRef = setInterval(() => {
    // using the setInterval function to go over each of the text strings in the text array
    // appending the oncoming strings to the currTxt string
    if(index < text.length) {
      currTxt += text[index];
      dialogue.innerHTML = currTxt;
      index++;
      return;
    }
    clearInterval(intervalRef);
  }, 5);

  // now implementing the close button function
  const closeBtn = document.getElementById('close');
  
  const onCloseBtnClick = () => {
    onDisplayEnd();
    dialogueUI.style.display = 'none';
    dialogue.innerHTML = '';
    clearInterval(intervalRef);
    closeBtn.removeEventListener('click', onCloseBtnClick);
  }
}

export default displayDialogue;