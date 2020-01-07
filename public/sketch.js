var strips = 10;

function printImage3(ctx) {
  var img = new Image();
  img.onload = function() {
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
  };

  img.src = "forrest.jpeg";
}

function printImage2(ctx) {
  var img = new Image();
  img.onload = function() {
    for (let i = 1; i <= strips; i = i + 2) {
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

    strips = strips + 4;
  img.src = "forrest.jpeg";
}

function printImage(ctx) {
  var img = new Image();
  img.onload = function() {
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
    printImage2(ctx);
    printImage3(ctx);
  };
  img.src = "desert.jpeg";
}

function draw() {
  var body = document.getElementsByTagName("body")[0];
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = body.offsetWidth;
  canvas.height = body.offsetHeight;

  printImage(ctx);
}

function r(f) {
  /in/.test(document.readyState) ? setTimeout("r(" + f + ")", 9) : f();
}
// use like
r(function() {
  console.log("DOM Ready!");
  draw();
  // setInterval(()=> draw(), 1000)
});
