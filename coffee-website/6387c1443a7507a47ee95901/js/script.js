// once the user clicks down

//increase the click count
// remove visbility class from the current pictureContainer using the current clickCount number(clickcount-1)
// then add that visibility to the videoContainer with the current clickCount number(clickCount - 1)

//once the user clicks out
//remove the visibility from the previous videoContainer using the (clickCount -1)
//add the visibility to the now current PictureContainer using the current clickCount

// Once the user clicks at the last click count
// remove visbility class from the current pictureContainer using the current clickCount number
// then add that visibility to the videoContainer using the current clickCount number

//user clicks out at the last  click count
// reset the clickCount
// add visibility to the current pictureContainer using the current clickCount number

const audio = document.createElement('audio');
const source = document.createElement('source');
audio.appendChild(source);
source.setAttribute(
  'src',
  'https://tegaguru.github.io/coffee-website/sound/click.mp3'
);
source.setAttribute('type', 'audio/mpeg');
audio.setAttribute('controls', 'controls');

const cursor = document.querySelector('.cursor');
const cursorText = document.querySelector('.cursor-text');

let pictureContainers = document.getElementsByClassName(
  'picture-container'
);

let videoContainers =
  document.getElementsByClassName('video-container');
let videoSrc = document.getElementsByClassName('video--src');

let clickCount = 0;
function resetClickCount() {
  clickCount = 0;
}

let isDown = false,
  isLong = false,
  target, // which element was clicked
  longTID;
// Set up an event handler for mousedown

function mouseDown() {
  clickCount++;
  if (clickCount <= 1) {
    pictureContainers[clickCount - 1].classList.remove('visible-now');
    videoContainers[clickCount - 1].classList.add('visible-now');
    videoSrc[clickCount - 1].play();
  } else {
    pictureContainers[clickCount - 1].classList.remove('visible-now');
    videoContainers[clickCount - 1].classList.add('visible-now');
    videoSrc[clickCount - 1].play();
  }
}

// let timer;
// document.addEventListener('mousedown', function (evt) {
//   clearTimeout(timer);
//   timer = setTimeout(mouseDown, 1000);
// });

document.addEventListener('mousedown', function (e) {
  const promise = audio.play();
  if (promise !== undefined) {
    promise
      .then(() => {
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // audio.play()
  //   .then(()=>{return;})
  //   .catch(err => {
  //     console.log(err);
  //   });
  cursorText.innerHTML = 'KEEP <br> HOLDING';
  isDown = true; // button status (any button here)
  isLong = false; // longpress status reset
  target = this; // store this as target element
  clearTimeout(longTID); // clear any running timers
  longTID = setTimeout(longPress, 300); // create a new timer for this click
});

// Set up a custom mouseup event handler for letting go
// of the mouse inside the box or when mouse leaves the box.
function mouseDone(evt) {
  //clearInterval(timer); // Cancel the previously initiated timer function
  if (clickCount <= 1) {
    console.log(videoContainers[clickCount - 1]);
    videoSrc[clickCount - 1].pause();
    videoContainers[clickCount - 1].classList.remove('visible-now');
    pictureContainers[clickCount].classList.add('visible-now');
  } else {
    videoSrc[clickCount - 1].pause();
    videoContainers[clickCount - 1].classList.remove('visible-now');
    clickCount = 0;
    pictureContainers[clickCount].classList.add('visible-now');
  }
}

document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mouseleave', handleMouseUp);

function handleMouseUp(e) {
  if (isDown && isLong) {
    cursorText.innerHTML = 'PRESS <br> AND HOLD';
    mouseDone(e);
    isDown = false; // clear in any case
    e.preventDefault(); // and ignore this event
    return;
  }

  if (isDown) {
    cursorText.innerHTML = 'PRESS <br> AND HOLD';
    // if we came from down status:
    clearTimeout(longTID); // clear timer to avoid false longpress
    isDown = false;
    target = null;
  }
}

function longPress() {
  isLong = true;
  mouseDown();
}

//--cursor trail animation

document.addEventListener('mousemove', (e) => {
  let x = e.pageX;
  let y = e.pageY;

  cursor.style.top = y - 30 + 'px';
  cursor.style.left = x - 30 + 'px';
});
