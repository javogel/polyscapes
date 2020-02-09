import { drawPenroseTiling, setupPenroseTiling } from "./penrose";
import {onDocumentReady, pickRandom, shuffleArray} from "./utils"
import { setupAudio, refreshAudioData } from "./audio";
import { centeredCircle, backgroundImage, triangle } from "./elements/static";
import { drawOscillator, drawOscillatorSmall } from "./elements/animated/oscillator";
import { circleOrbit } from "./elements/animated/orbit";

let images = shuffleArray(["forrest.jpeg", "desert.jpeg", "gradient.jpeg", "yosemite.jpeg", "snow.jpeg", "peak.jpeg"])
const imageElements = [
  backgroundImage,
//   verticalStripes,
//   horizontalStripes,
//   centeredCircle,
// triangle,

  drawOscillator,
  drawOscillatorSmall,
  // circleOrbit,
  drawPenroseTiling
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

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  if(Math.random()<0.3){
    refreshAudioData(audio)
  }
  
  



  

  // canvas.width = body.offsetWidth;
  // canvas.height = body.offsetHeight;

  
  // backgroundImage(ctx, images[0])
  drawElements(imageElements, ctx)
  

}


function drawElements(elements, ctx){
  elements.forEach((el, index)=>{
    ctx.save()
    el(ctx, images[index+1], audio)
    ctx.restore()
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
  audio.images = images

  var body = document.getElementsByTagName("body")[0];
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  
  canvas.width = body.offsetWidth;
  canvas.height = body.offsetHeight;
  

  setupPenroseTiling(ctx, images)
 

  requestAnimationFrame(draw)
}


onDocumentReady(setUpPolyscape)

