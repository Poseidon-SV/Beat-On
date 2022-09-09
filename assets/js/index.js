
// document.querySelector('#info_btn').addEventListener('click', () => {
//     document.querySelector('.card__content').classList.add('info_on');
//   }); 

// document.querySelector('#beat_btn').addEventListener('click', () => {
//     document.querySelector('.card__content').classList.remove('info_on');
//   }); 

$('#info_btn').click(function () {
    $('.card__content').addClass('info_on');
});

$('#beat_btn').click(function () {
    $('.card__content').removeClass('info_on');
});

// console.log(document.querySelectorAll('.cards_layout').classList);

// var notes = $(".sound");

// $(".card").click(function () {
//     // var num = 1;//parseInt(this.id);
//     // play(num);
//     // console.log("pppppppp")
//     note1.play()
//   });

// function play(num) {
//     // notes[num].pause();
//     notes[num].currentTime = 0;
//     notes[num].play();
//     // $("#" + num).css({
//     //   "font-weight": "bold",
//     //   "color": "#FCFBE3"
//     // });
//     // setTimeout(function() {
//     //   $("#" + num).css({
//     //     "font-weight": "normal",
//     //     "color": "#3a2f21"
//     //   });
//     // }, 300);
//   }

const UInotes = document.querySelector('.cards_layout')

window.addEventListener('keydown', (e) => {
  playNotes(e.key)
  console.log(e)
  
})

UInotes.addEventListener('click', (e) => {
    playNotes(e.target.dataset.key)
  console.log(e.target.dataset.key)
  
})

function audioAnalyser(notes){
  var context = new AudioContext()
  // var src = context.createMediaElementSource(notes)
  // var analyser = context.createAnalyser()

  var flag = 'false'
  
  if (flag == 'false') {
    console.log("this")
    var src = context.createMediaElementSource(notes)
    var analyser = context.createAnalyser()
    // suspend.destination.dispatchEvent
    src.connect(analyser)
    analyser.connect(context.destination)

    flag = 'true'
  } else {
    console.log("else")
  }

  var canvas = document.getElementById("canvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  var ctx = canvas.getContext("2d")

  // src.connect(analyser)
  // analyser.connect(context.destination)

  analyser.fftSize = 128

  var bufferLength = analyser.frequencyBinCount
  console.log(bufferLength)

  var dataArray = new Uint8Array(bufferLength)

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = (WIDTH / bufferLength) * 1.5
  var barHeight
  var x = 0

  function renderFrame() {
    requestAnimationFrame(renderFrame)

    x = 0

    analyser.getByteFrequencyData(dataArray)

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 1.5
      
      var r = barHeight + (5 * (i/bufferLength))
      var g = 150 * (i/bufferLength)
      var b = 90 * (i/bufferLength)

      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")"
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

      x += barWidth + 5
    }
  }

  renderFrame()
};

function playNotes(key) {
  const notes = document.querySelector(`audio[data-key="${key.toLowerCase()}"]`)

  notes.currentTime = 0
  notes.play()
  audioAnalyser(notes)

}
