const images = ["forrest.jpeg", "desert.jpeg", "gradient.jpeg", "yosemite.jpeg", "snow.jpeg", "peak.jpeg"]
const imageElements = [
  backgroundImage, 
  verticalStripes, 
  horizontalStripes, 
  // diagonalStripes,  
  centeredCircle, 
  triangle
]


function triangle(ctx, img) {
  if(Math.random() < 0.3)  return 

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
  if(Math.random() < 0.3)  return 

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
  if(Math.random() < 0.5)  return 

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
  if(Math.random() < 0.5)  return 
  
  const strips = 12;

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

function diagonalStripes(ctx, img) {
  if(Math.random() < 0)  return 
  
  const strips = 12;
  const lineWidth = 50;
  ctx.save()
  // ctx.lineWidth = 30
  // ctx.strokeStyle = "rgba(1, 1, 1, 0)";
  ctx.beginPath();
 

  for (let i = 1; i <= strips; i = i + 2) {
    ctx.moveTo(0, i*canvas.height/strips);
    ctx.lineTo(i*canvas.width/strips,0);
   
  }

  // ctx.moveTo(0, canvas.height);
  // ctx.lineTo(canvas.width,0);

  for (let y = strips; y > 0; y = y - 2) {
    ctx.moveTo( y*canvas.width/strips, canvas.height);
    ctx.lineTo(canvas.width,  y*canvas.height/strips);
 
  }

  ctx.stroke();


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

  ctx.restore()
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
  var body = document.getElementsByTagName("body")[0];
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = body.offsetWidth;
  canvas.height = body.offsetHeight;
  
  // const [first, ...rest] = imageElements
  // drawElements([first, ...shuffleArray(rest)], ctx)
  drawElements(imageElements, ctx)
}


function drawElements(elements, ctx){
  if(elements.length == 0) return 

  const [el, ...rest] = elements
  const img = new Image();
  img.onload = function() {
    el(ctx, img)
    drawElements(rest, ctx)
  }
  img.src = pickRandom(images)

}

function pickRandom(list){
  return list[Math.floor(Math.random()*list.length)];
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array
}

onDocumentRready(function() {
  console.log("DOM Ready!");
  draw();
  // setInterval(()=> draw(), 1000)
});

function onDocumentRready(f) {
  /in/.test(document.readyState) ? setTimeout("onDocumentRready(" + f + ")", 9) : f();
}