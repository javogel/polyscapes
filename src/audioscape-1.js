import { drawPenroseTiling, setupPenroseTiling } from "./penrose";
import {onDocumentReady, pickRandom, shuffleArray} from "./utils"

let images = shuffleArray(["forrest.jpeg", "desert.jpeg", "gradient.jpeg", "yosemite.jpeg", "snow.jpeg", "peak.jpeg"])
const imageElements = [
//   verticalStripes,
//   horizontalStripes,
//   centeredCircle,
//   triangle,
//  drawPenroseTiling,
  drawOscillator,
  drawOscillatorSmall,
  circleOrbit,
  

]

let userInteracted = false;

// Start of audio setup code
let audioCtx 
let source;
let analyser 
let frequencyAnalyser;
let audioDomainArray
let audioFrequencyArray
let audioReady = false
// End of audio setup code

function drawPolygon(ctx, centerX, centerY, img, time, options = {}) {
    ctx.save();
    
    ctx.translate(centerX, centerY);
  
    var sides = options.sides;
    var size = options.size || 500;
    var radians = 0;
  
    if (options.rotation) {
      if (options.rotation.animated) {
        radians =
          ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds();
      }
      if (options.rotation.direction == "counter-clockwise") {
        radians = -radians;
      }
      if (options.rotation.offset) {
        radians += options.rotation.offset;
      }
  
      ctx.rotate(radians);
    }
  
    ctx.beginPath();
    //ctx.moveTo (size * Math.cos(0), size *  Math.sin(0));
    if (options.sides == "circle") {
      ctx.arc(0, 0, size, 0, 2 * Math.PI);
    } else {
      // ctx.moveTo(size/2 * Math.sin(0), size/2 * Math.cos(0));
      for (var i = 1; i <= sides; i += 1) {
       
        var vertexSize =  size/2 + (Math.abs(audioDomainArray[i] - 128))*2
  
       
    
        var x = Math.round(vertexSize * Math.sin((i * 2 * Math.PI) / sides));
        var y = Math.round(vertexSize * Math.cos((i * 2 * Math.PI) / sides));
  
        if(i===1){
          ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
      }
    }
  
    if (options.outline) {
      // We are making the same polygon but 90% of the size to create an 'outline' from the delta.
      var innerPolygonSize = size * 0.45;
  
      //ctx.moveTo(innerPolygonSize * Math.cos(0), innerPolygonSize * Math.sin(0));
  
      if (options.sides == "circle") {
        ctx.arc(0, 0, innerPolygonSize, 0, 2 * Math.PI);
      } else {
        ctx.moveTo(
          innerPolygonSize * Math.sin(0),
          innerPolygonSize * Math.cos(0)
        );
        for (var i = 1; i <= sides; i += 1) {
          var x = Math.round(
            innerPolygonSize * Math.sin((i * 2 * Math.PI) / sides)
          );
          var y = Math.round(
            innerPolygonSize * Math.cos((i * 2 * Math.PI) / sides)
          );
  
          ctx.lineTo(x, y);
        }
      }
    }
  
    // NOTE: this is SUPER SUPER important for drawing outlines!!
    ctx.clip("evenodd");
  
    if (options.rotation) {
      ctx.rotate(-radians);
    }
    ctx.translate(-centerX, -centerY);
  
    if (!options.orbiting) {
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      ctx.restore();
    }
  
}

function drawOscillator(ctx, img){
    var time = new Date();
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;

    drawPolygon(ctx, cx, cy, img, time , { sides: audioDomainArray.length, size: 500, rotation: { offset: Math.PI * Math.random()  , animated: true } });

  }

function drawOscillatorSmall(ctx, img){
    var time = new Date();
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;

    ctx.save()
    // ctx.globalCompositeOperation="color-burn"
    drawPolygon(ctx, cx, cy, img, time , { sides: audioDomainArray.length, size: audioDomainArray[0]*3,  rotation: { offset: Math.PI * Math.random()  , animated: true } });
    ctx.restore()
  }

function circleOrbit(ctx, img){
    var time = new Date();

    drawOrbit(ctx, 50, Math.max(Math.abs(audioDomainArray[0]-128), 4), 'clockwise', img, time, {  sides: "circle", size: 100,  orbiting: true, rotation: { offset: Math.PI/4, animated: true }});

}

function drawOrbit(
    ctx,
    radius,
    numberOrbiting,
    direction,
    img,
    time,
    polygonOptions
  ) {
    var radians =
      ((2 * Math.PI) / 48) * time.getSeconds() +
      ((2 * Math.PI) / 48000) * time.getMilliseconds();
  
    if (direction == "counter-clockwise") {
      radians = -radians;
    }
    radius =  radius + (audioDomainArray[0] - 128)
  
    for (var i = 1; i <= numberOrbiting; i++) {
      var offset = (Math.PI * 2 * i) / numberOrbiting;
  
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians + offset);
      ctx.translate(radius, 0);
      var circleRadius = 5 + Math.abs(audioDomainArray[1] -128)
      drawPolygon(ctx, radius / 2, radius / 2, img, time, {...polygonOptions, size: circleRadius   });
      ctx.translate(-radius, 0);
      ctx.rotate(-radians - offset);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      ctx.restore();
      ctx.restore();
    }
  }


function triangle(ctx, img) {
  const side = 700
  const cx = canvas.width/2
  const cy = canvas.height/2 - 50
  const h = side * (Math.sqrt(3)/2);

  ctx.save();
  ctx.strokeStyle = "rgba(1, 1, 1, 0)";
  ctx.translate(cx, cy);

  ctx.beginPath();

    ctx.moveTo(0, -h / 2);
    ctx.lineTo( -side / 2, h / 2);
    ctx.lineTo(side / 2, h / 2);
    ctx.lineTo(0, -h / 2);
    ctx.stroke();

  ctx.clip();
  ctx.translate(-cx, -cy);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
  ctx.restore();
}

function centeredCircle(ctx, img) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(188, 150);
    ctx.arc(canvas.width / 2, canvas.height / 2, 300, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.clip();
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    ctx.restore();
}

function horizontalStripes(ctx, img) {
  const strips = 12;
    for (let i = 1; i <= strips; i = i + 3) {
      ctx.drawImage(
        img,
        0,
        i * img.height/strips,
        img.width,
        img.height/strips,
        0,
        i * canvas.height/strips,
        canvas.width,
        canvas.height/strips
      );
    }
}

function verticalStripes(ctx, img) {
  const strips = Math.floor(audioDomainArray[0]/10);

  for (let i = 1; i <= strips; i = i + 3) {
    ctx.drawImage(
      img,
      i * img.width/strips,
      0,
      img.width/strips,
      img.height,
      i * canvas.width/strips,
      0,
      canvas.width/strips,
      canvas.height
    );
  }


}


function backgroundImage(ctx, img) {
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
}

function draw() {
  requestAnimationFrame(draw)

  if(audioReady === false) return
  refreshAudioData()
  

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
  // ctx.save()
  elements.forEach((el, index)=>{
    // console.log(el, images[index+1])
    el(ctx, images[index+1])
  })
  // ctx.restore()
  // debugger;
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
    if(audioReady === false){
     setupAudio()
    
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



//
// AUDIO API
//

function refreshAudioData() {
    analyser.getByteTimeDomainData(audioDomainArray);
    // frequencyAnalyser.getByteFrequencyData(audioFrequencyArray)

}

function setupAudio() {
    if (navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
  
  
      var soundNotAllowed = function (error) {
          console.log( "You must allow your microphone.");
      }
  
      navigator.getUserMedia({audio:true}, function(stream) {
        audioCtx = new AudioContext();
        source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        frequencyAnalyser = audioCtx.createAnalyser();
        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;
        analyser.smoothingTimeConstant = 0.85;
        analyser.fftSize = 512;

        // frequencyAnalyser.fftSize = 32;
        // frequencyAnalyser.minDecibels = -90;
        // frequencyAnalyser.maxDecibels = -10;
        // frequencyAnalyser.smoothingTimeConstant = 0.85;
  
        audioDomainArray = new Uint8Array(analyser.frequencyBinCount);
        audioFrequencyArray = new Uint8Array(frequencyAnalyser.frequencyBinCount);
        source.connect(analyser);
        // analyser.connect(frequencyAnalyser)
        audioReady = true
      }, soundNotAllowed);
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }







