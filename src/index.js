import { drawPenroseTiling, setupPenroseTiling } from "./penrose";
import {onDocumentReady, pickRandom, shuffleArray} from "./utils"
import { setupAudio, refreshAudioData } from "./audio";
import { centeredCircle, backgroundImage, triangle } from "./elements/static";
import { drawOscillator, drawOscillatorSmall } from "./elements/animated/oscillator";
import { circleOrbit } from "./elements/animated/orbit";

let images = shuffleArray(["forrest.jpeg", "desert.jpeg", "gradient.jpeg", "yosemite.jpeg", "snow.jpeg", "peak.jpeg"])
const imageElements = [
//   verticalStripes,
//   horizontalStripes,
//   centeredCircle,
// triangle,
  // drawPenroseTiling,
  drawOscillator,
  drawOscillatorSmall,
  circleOrbit
  

]

let userInteracted = false;

// Start of audio state
const audio = {
  domainArray: null,
  frequencyArray: null,
  audioReady: false
}
// Start of audio state


function draw() {
  requestAnimationFrame(draw)

  if(audio.audioReady === false) return
  refreshAudioData(audio)
  

  // var body = document.getElementsByTagName("body")[0];
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  

  // canvas.width = body.offsetWidth;
  // canvas.height = body.offsetHeight;

  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle=`rgba(${20* (Math.abs(audioDataArray[0]-128))},${4* (Math.abs(audioDataArray[0]-128))}, ${5* (Math.abs(audioDataArray[0]-128))} )`;
  // ctx.fillRect(0, 0, canvas.width,canvas.height);

  
  backgroundImage(ctx, images[0])
  drawElements(imageElements, ctx)
  

}


function drawElements(elements, ctx){
  elements.forEach((el, index)=>{
    el(ctx, images[index+1], audio)
  })
}



function loadImages() {
  images = images.map((src)=>{
    const img = new Image();
    img.src = src
    return img
  })
}


function setUpPolyscape() {
  document.body.addEventListener('click', function() {
    if(audio.audioReady === false){
     setupAudio(audio)
     userInteracted = true
    }
  });
  loadImages()

  var body = document.getElementsByTagName("body")[0];
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  
  canvas.width = body.offsetWidth;
  canvas.height = body.offsetHeight;
  

  setupPenroseTiling(ctx, images)
 
  requestAnimationFrame(draw)
}


onDocumentReady(setUpPolyscape)

