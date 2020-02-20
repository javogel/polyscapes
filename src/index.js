import {
  drawPenroseTiling,
  drawSequentialPenroseTiling,
  setupPenroseTiling,
  setupSequentialPenroseTiling
} from "./penrose";
import { setupMovingObjets, setupPulsors, drawMovingBalls, drawPulses } from "./moving_objects";
import { onDocumentReady, pickRandom, shuffleArray } from "./utils";
import { setupAudio, refreshAudioData } from "./audio";
import { centeredCircle, backgroundImage, triangle } from "./elements/static";
import {
  drawOscillator,
  drawOscillatorSmall
} from "./elements/animated/oscillator";
import { circleOrbit } from "./elements/animated/orbit";

let images = shuffleArray([
  "forrest.jpeg",
  "desert.jpeg",
  // "gradient.jpeg",
  // "yosemite.jpeg",
  // "snow.jpeg",
  "peak.jpeg",
  "tree.jpeg",
  // "city.jpeg",
  "bark.jpeg",
  "ocean.jpeg",
  "ocean2.jpeg",
  "purple-sky.jpeg",
  "white-trees.jpeg",
  // "orange-tree.jpeg"
]);
const imageElements = [
  backgroundImage,
  //   verticalStripes,
  //   horizontalStripes,
  //   centeredCircle,
  // triangle,
  //drawPenroseTiling,
  //drawOscillator,

  //drawSequentialPenroseTiling,
  //drawOscillatorSmall,
  // circleOrbit,
  drawPulses,
  drawMovingBalls
];

let userInteracted = false;

// Start of audio state
const audio = {
  domainArray: null,
  frequencyArray: null,
  audioReady: false
};
// Start of audio state

function draw() {
  requestAnimationFrame(draw);

  if (audio.audioReady === false) return;

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  if (Math.random() < 0.3) {
    refreshAudioData(audio);
  }

  // backgroundImage(ctx, images[0])
  drawElements(imageElements, ctx);
}

function drawElements(elements, ctx) {
  elements.forEach((el, index) => {
    ctx.save();
    el(ctx, images[index], audio);
    ctx.restore();
  });
}

function loadImages() {
  images = images.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });
}

function setUpPolyscape() {
  const userInteractedCallback = function() {
    if (audio.audioReady === false) {
      setupAudio(audio);
      userInteracted = true;
    }
  };
  document.body.addEventListener("click", userInteractedCallback);
  document.body.addEventListener("touchstart", userInteractedCallback, false);
  loadImages();
  audio.images = images;

  var body = document.getElementsByTagName("body")[0];
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = body.offsetWidth;
  canvas.height = body.offsetHeight;

  setupPenroseTiling(ctx, images);
  setupSequentialPenroseTiling(ctx, images);
  //setupMovingObjets(ctx, images);
  setupPulsors(ctx, images);

  requestAnimationFrame(draw);
}

onDocumentReady(setUpPolyscape);
