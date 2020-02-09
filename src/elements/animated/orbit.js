import { drawPolygon } from "./polygon";

export function circleOrbit(ctx, img, audio){
    var time = new Date();
    drawOrbit(ctx, 50, Math.max(Math.abs(audio.domainArray[0]-128), 4), 'clockwise', img, time, {  sides: "circle", size: 100,  orbiting: true, rotation: { offset: Math.PI/4, animated: true }}, audio);
}

function drawOrbit(
    ctx,
    radius,
    numberOrbiting,
    direction,
    img,
    time,
    polygonOptions,
    audio
  ) {
    var radians =
      ((2 * Math.PI) / 48) * time.getSeconds() +
      ((2 * Math.PI) / 48000) * time.getMilliseconds();
  
    if (direction == "counter-clockwise") {
      radians = -radians;
    }
    radius =  radius + (audio.domainArray[0] - 128)
  
    for (var i = 1; i <= numberOrbiting; i++) {
      var offset = (Math.PI * 2 * i) / numberOrbiting;
  
      ctx.save();
      ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
      ctx.rotate(radians + offset);
      ctx.translate(radius, 0);
      var circleRadius = 5 + Math.abs(audio.domainArray[1] -128)
      drawPolygon(ctx, radius / 2, radius / 2, img, time, {...polygonOptions, size: circleRadius   });
      ctx.translate(-radius, 0);
      ctx.rotate(-radians - offset);
      ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
      ctx.restore();
      ctx.restore();
    }
  }