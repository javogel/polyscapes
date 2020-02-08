import { drawPolygon } from "./polygon";

export function drawOscillator(ctx, img, audio){
    var time = new Date();
    var cx = ctx.canvas.width / 2;
    var cy = ctx.canvas.height / 2;

    drawPolygon(ctx, cx, cy, img, time , { sides: audio.domainArray.length, size: 500, rotation: { offset: Math.PI * Math.random()  , animated: true } }, audio);

  }

export function drawOscillatorSmall(ctx, img, audio){
    var time = new Date();
    var cx = ctx.canvas.width / 2;
    var cy = ctx.canvas.height / 2;

    ctx.save()
    // ctx.globalCompositeOperation="color-burn"
    drawPolygon(ctx, cx, cy, img, time , { sides: audio.domainArray.length, size: audio.domainArray[0]*3,  rotation: { offset: Math.PI * Math.random()  , animated: true } }, audio);
    ctx.restore()
  }