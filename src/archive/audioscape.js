const landscapes = [
  "forrest.jpeg",
  "desert.jpeg",
  "gradient.jpeg",
  "yosemite.jpeg",
  "snow.jpeg",
  "peak.jpeg"
];

var canvas;
const backgroundImg = new Image();
const treeImg = new Image();
const riverImg = new Image();
let audioReady = false;

// Start of audio setup code
var audioCtx 
var source;
var stream;
var analyser 

var dataArrayAlt
// var  dataArrayAlt  = new Float32Array(analyser.frequencyBinCount);
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
     
      var vertexSize =  size/2 + (Math.abs(dataArrayAlt[i] - 128))*2

     
  
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
    var innerPolygonSize = size * 0.9;

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

  for (var i = 1; i <= numberOrbiting; i++) {
    var offset = (Math.PI * 2 * i) / numberOrbiting;
    //var radians = Math.PI;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(radians + offset);
    ctx.translate(radius, 0);
    drawPolygon(ctx, radius / 2, radius / 2, img, time, polygonOptions);
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

function drawCircle(ctx, img) {
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

function drawBackgroundImage(ctx, img) {
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

function drawElements() {
  var ctx = document.getElementById("canvas").getContext("2d");
  var time = new Date();
  var cx = canvas.width / 2;
  var cy = canvas.height / 2;

  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(audioReady ){
    refreshAudioData()
  }

  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 3, rotation: { offset: 0 } });
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 3, rotation: { offset: Math.PI } });
  //
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 3, rotation: { offset: 0, animated: true } });
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 3, rotation: { offset: 0, animated: true, direction: 'counter-clockwise' } });
  // drawPolygon(ctx, cx, cy, riverImg, time, { sides: 3, rotation: { offset: Math.PI, animated: true } });
  //
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 4, rotation: { offset: 0 } });
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 5, rotation: { offset: 0 } });
  //
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 3, outline: true, rotation: { offset: 0 } });
  //
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 3, outline: true, rotation: { offset: 0, animated: true } });
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 3, outline: true, rotation: { offset: 0, animated: true, direction: 'counter-clockwise' } });
  //
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 4, outline: true, rotation: { offset: 0 } });
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 4, outline: true, rotation: { offset: 0, animated: true } });
  //drawPolygon(ctx, cx, cy, riverImg, time, { sides: 4, outline: true, rotation: { offset: 0, animated: true, direction: 'counter-clockwise' } });
  //
  //drawPolygon(ctx, cx, cy, riverImg, time, { size: 200, sides: 'circle', rotation: { offset: 0 } });
  //drawPolygon(ctx, cx, cy, riverImg, time, { size: 200, sides: 'circle', outline: true, rotation: { offset: 0 } });

  //drawOrbit(ctx, 300, 12, 'clockwise', riverImg, time, { sides: 'circle', size: 100, orbiting: true, rotation:{ offset: 0 } });
  //drawOrbit(ctx, 300, 12, 'clockwise', riverImg, time, { sides: 'circle', size: 100, outline: true, orbiting: true, rotation:{ offset: 0 } });
  //drawOrbit(ctx, 300, 12, 'counter-clockwise', riverImg, time, { sides: 'circle', size: 100, outline: true, orbiting: true, rotation:{ offset: 0 } });
  //
  //drawOrbit(ctx, 300, 12, 'clockwise', riverImg, time, { sides: 4, size: 100, outline: true, orbiting: true, rotation:{ offset: 0 } });
  //drawOrbit(ctx, 300, 12, 'clockwise', riverImg, time, { sides: 4, size: 100, outline: true, orbiting: true, rotation:{ offset: 0, animated: true } });
  //drawOrbit(ctx, 300, 12, 'clockwise', riverImg, time, { sides: 4, size: 100, outline: true, orbiting: true, rotation: { offset: Math.PI/4, animated: true }});
  
 

  if(audioReady){
//     drawBackgroundImage(ctx, backgroundImg);
drawPolygon(ctx, cx, cy, riverImg, time , { sides: dataArrayAlt.length, rotation: { offset: Math.PI , animated: true } });
  
// drawCircle(ctx, treeImg, time);
// drawBackgroundImage(ctx, backgroundImg, time);
}
  
 
  // drawCircle(ctx,riverImg) 
  // drawPolygon(ctx, cx, cy, riverImg, time, { sides: 3, rotation: { offset: Math.PI } });


  // drawOrbit(ctx, 300, 12, 'clockwise', riverImg, time, { sides: 3, size: 100, outline: true, orbiting: true, rotation:{ offset: 0, animated: true } });
  // drawOrbit(ctx, 300, 12, 'clockwise', riverImg, time, { sides: dataArrayAlt[0]% 10 , size: 100, outline: true, orbiting: true, rotation: { offset: 0, direction: 'counter-clockwise', animated: true }});
  // }
  // drawPolygon(ctx, cx, cy, riverImg, time, { sides: 5, outline: true, rotation: { offset: 0 } });
  // drawCircle(ctx, treeImg, time);
  // drawBackgroundImage(ctx, backgroundImg, time);


  

  window.requestAnimationFrame(drawElements);
}

onDocumentRready(function() {
  console.log("DOM Ready!");
  var body = document.getElementsByTagName("body")[0];
  canvas = document.getElementById("canvas");

  canvas.width = body.offsetWidth;
  canvas.height = body.offsetHeight;

  backgroundImg.src = "https://pbs.twimg.com/media/EB6q75_WwAIJz3A.jpg";
  treeImg.src =
    "https://steemitimages.com/DQmaZrKCAZuoMtuW9vYDuYWJ8iHxKuvQXLRVJGb4f2F7Lr1/IiRlys6.jpg";
  riverImg.src =
    "https://i.pinimg.com/originals/e6/6f/66/e66f66f33eebaa83b801493559fd30e6.jpg";

  window.requestAnimationFrame(drawElements);

  document.body.addEventListener('click', function() {
    if(audioReady === false){
     setupAudio()
    }
    
   });
});

function onDocumentRready(f) {
  /in/.test(document.readyState)
    ? setTimeout("onDocumentRready(" + f + ")", 9)
    : f();
}

function setupAudio() {
  if (navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");


    var soundAllowed = function(stream) {
      audioCtx= new AudioContext();
      source = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser();
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;
      analyser.fftSize = 512;

      dataArrayAlt = new Uint8Array(analyser.frequencyBinCount);

      source.connect(analyser);
      audioReady = true
      console.log("mic ready")
    }

    var soundNotAllowed = function (error) {
        console.log( "You must allow your microphone.");
    }

    navigator.getUserMedia({audio:true}, soundAllowed, soundNotAllowed);
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
}

function refreshAudioData() {
  analyser.getByteTimeDomainData(dataArrayAlt);

  console.log(dataArrayAlt);
}


